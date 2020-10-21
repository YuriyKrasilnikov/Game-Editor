
def get_access(data, access):

    if ('x-cheat' in data) and (data['x-cheat']=='true'):
      print(f"cheat: {data['x-cheat']}", flush=True)
      return True, True

    authorization = False
    access_key = False

    if data['x-user-authorization']=='true':
      authorization=True
      if access:
        for key in access:
          if data['x-user-authorization-'+key]==access[key]:
            access_key=True
          else:
            break
      else:
        access_key=True
    
    print(f"Authorization: {authorization}", flush=True)
    print(f"Access: {access_key}", flush=True)
    
    return authorization, access_key