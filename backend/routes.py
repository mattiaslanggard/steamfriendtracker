from typing import List, Union

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from operations import *

app = FastAPI()

origins = [
    "https://localhost:5173",
    "http://localhost:5173",
    "https://localhost",
    "http://localhost"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/friends")
def read_friends():
    data = get_friends()
    return {"data": data}


@app.get("/players/")
def read_players(steamids: List[int] = Query([])):
    data = get_player_summaries(steamids)
    return {"data": data}


@app.get("/recent_games/{steamid}")
def read_recent_games(steamid: int):
    data = get_recently_played_games(steamid)
    return {"data": data}