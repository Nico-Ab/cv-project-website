import duckdb
import pandas as pd
import time

def test_optimized_equals_naive():
    n = 1000
    orders = pd.DataFrame({
        'order_id': range(1, n+1),
        'customer_id': [i%50 for i in range(1, n+1)],
        'amount': [1.0] * n
    })
    con = duckdb.connect()
    con.register('orders', orders)

    t0 = time.time()
    naive = con.execute('select customer_id, sum(amount) as total from orders group by 1 order by 1').df()
    t1 = time.time()

    con.execute('create temp view agg as select customer_id, sum(amount) as total from orders group by 1')
    t2 = time.time()
    opt = con.execute('select * from agg order by 1').df()
    t3 = time.time()

    pd.testing.assert_frame_equal(naive, opt)
    print(f"naive: {t1-t0:.4f}s, materialize: {t3-t2:.4f}s")
