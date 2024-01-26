import requests

def get_friends():
    api_url = 'https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=CA240D9C9197960C0CB6A0097634423D&steamid=76561198046783748&relationship=friend'
    response = requests.get(api_url)
    data = response.json()
    return data['friendslist']['friends']

def get_player_summaries(steamids):
    steamids_str = ','.join(str(id) for id in steamids)
    api_url = f'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=CA240D9C9197960C0CB6A0097634423D&steamids={steamids_str}'
    response = requests.get(api_url)
    data = response.json()
    return data['response']['players']

def get_recently_played_games(steamid):
    api_url = f'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=CA240D9C9197960C0CB6A0097634423D&steamid={steamid}&format=json'
    response = requests.get(api_url)
    data = response.json()
    return data['response']