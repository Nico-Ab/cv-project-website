import duckdb
import pandas as pd

def upsert(base: pd.DataFrame, events: pd.DataFrame) -> pd.DataFrame:
    merged = pd.concat([base, events]).sort_values(['order_id']).drop_duplicates(['order_id'], keep='last')
    return merged.reset_index(drop=True)

def test_upsert_is_idempotent():
    base = pd.DataFrame({'order_id':[1,2], 'status':['open','open']})
    events = pd.DataFrame({'order_id':[2,3], 'status':['closed','open']})

    once = upsert(base, events)
    twice = upsert(once, events)
    assert once.equals(twice), "upsert should be idempotent when reapplying same events"
