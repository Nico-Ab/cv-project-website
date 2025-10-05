import duckdb
import pandas as pd

def test_fact_refs_dim_keys():
    con = duckdb.connect()
    dim_customer = pd.DataFrame({
        'customer_key':[1,2],
        'customer_id':['c1','c2'],
        'is_current':[True, True]
    })
    dim_product = pd.DataFrame({
        'product_key':[10,11],
        'product_id':['p1','p2']
    })
    fct_orders = pd.DataFrame({
        'order_id':[100,101,102],
        'customer_key':[1,2,999],
        'product_key':[10,11,10],
        'amount':[20.0, 30.0, 10.0]
    })
    con.register('dim_customer', dim_customer)
    con.register('dim_product', dim_product)
    con.register('fct_orders', fct_orders)

    orphans = con.execute('''
      with fk as (
        select o.customer_key, o.product_key
        from fct_orders o
      )
      select count(*) as cnt
      from fk
      left join dim_customer dc using(customer_key)
      left join dim_product dp using(product_key)
      where dc.customer_key is null or dp.product_key is null
    ''').fetchone()[0]

    assert orphans == 1, f"expected 1 orphan FK, got {orphans}"

def test_scd2_only_one_current_row():
    con = duckdb.connect()
    scd = pd.DataFrame({
        'customer_id':['c1','c1','c2'],
        'customer_key':[1,2,3],
        'is_current':[True, False, True]
    })
    con.register('dim_customer', scd)
    dup_current = con.execute('''
      select customer_id, sum(case when is_current then 1 else 0 end) as current_rows
      from dim_customer group by 1 having current_rows != 1
    ''').fetchall()
    assert dup_current == [], f"each customer must have exactly one current row; got {dup_current}"
