import duckdb
import pandas as pd

def test_not_null_and_ranges():
    con = duckdb.connect()
    orders = pd.DataFrame({
        'order_id':[1,2,3],
        'amount':[10.0, None, -5.0]
    })
    con.register('orders', orders)
    nulls = con.execute('select count(*) from orders where amount is null').fetchone()[0]
    negatives = con.execute('select count(*) from orders where amount < 0').fetchone()[0]
    assert nulls == 1, f"expected 1 null amount, got {nulls}"
    assert negatives == 1, f"expected 1 negative amount, got {negatives}"
