
import uuid
import json

from events.sessions import send_event

def registered( server, value ):
  
  create_profile={
    'service_id': server.service_id,
    'producer': server.producer,
    'topic': 'command-profile',
    'command': 'insert',
    'dialog_id': str( uuid.uuid4() ),
    'user_id': 'anonymous', 
    'request': value
  }

  get_request={
    'service_id': server.service_id,
    'producer': server.producer,
    'topic': 'query_orchestrator',
    'command': 'get_profile',
    'dialog_id': str( uuid.uuid4() ),
    'user_id': 'anonymous', 
    'request': {
      'datas': [ value ],
      'paths': [ 'id' ]
    }
  }

  for msg, status in send_event( **create_profile ):
    if status == 'close':
      for msg, status in send_event( **get_request ):
        if status == 'close':
          profile_id = json.loads( msg )['profiles'][0]['id']
          create_billing={
            'service_id': server.service_id,
            'producer': server.producer,
            'topic': 'command-billing',
            'command': 'insert',
            'dialog_id': str( uuid.uuid4() ),
            'user_id': profile_id, 
            'request': {
              'profileid': profile_id,
              'value': 0,
              'status': 'active'
            }
          }
          for msg, status in send_event( **create_billing ):
            yield 'Create billing '+msg, status
        else:
          yield 'Get profile '+msg, status
    else:
      yield 'Create profile '+msg, status

def delete_profile( server, value ):
  user_profile={
    'service_id': server.service_id,
    'producer': server.producer,
    'topic': 'command-profile',
    'command': 'remove',
    'dialog_id': str( uuid.uuid4() ),
    'user_id': 'anonymous', 
    'request': value
  }

  billing_profile={
    'service_id': server.service_id,
    'producer': server.producer,
    'topic': 'command-billing',
    'command': 'remove',
    'dialog_id': str( uuid.uuid4() ),
    'user_id': 'anonymous', 
    'request': {
      'profileid': value['id']
    }
  }

  for msg, status in send_event( **user_profile ):
    yield 'Delete user profile '+msg, status

  for msg, status in send_event( **billing_profile ):
    yield 'Delete billing profile '+msg, status
      

commands = {
  'registered': registered,
  'delete_profile': delete_profile,
}