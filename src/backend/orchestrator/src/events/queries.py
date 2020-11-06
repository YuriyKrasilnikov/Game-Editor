import uuid
import json

from google.protobuf import json_format

from service.profile_client import ProfileClient
from service.billing_client import BillingClient

def get_profile( value ):

  client = ProfileClient()
  client_response = client.get_profile(
    **value
  )

  response_dict = json_format.MessageToDict( client_response )

  return json.dumps( response_dict )

queries = {
  'get_profile': get_profile,
}