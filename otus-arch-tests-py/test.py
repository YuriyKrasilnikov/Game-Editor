import requests
import os
import faker
from requests_toolbelt.utils import dump

SERVICE_NAME=os.environ.get('SERVICE_NAME')
SERVICE_PORT=os.environ.get('SERVICE_PORT')
SERVICE_PATH=os.environ.get('SERVICE_PATH')


API_URL=f'http://{SERVICE_NAME}:{SERVICE_PORT}{SERVICE_PATH}'

def print_request(r, *args, **kw):
    print(dump.dump_all(r).decode('utf-8'))

def assertResponse(assertion, success, failed):
    if assertion:
        print(success)
    else:
        print(failed)
        raise AssertionError("Test FAILED")

def assertStatusCode(r, status_code):
    assertResponse(
        r.status_code == status_code,
        success=f"OK: Status code is {status_code}",
        failed=f"FAILED: Status code is not {status_code}, it's {r.status_code}"
    )

def assertHasKey(r, key):
    assertResponse(
        key in r.json(),
        success=f"OK: {key} in response".format(key),
        failed=f"FAILED: not {key} in response {r.json()}"
    )

def assertHasValue(r, key, value):
    assertHasKey(r, key)
    assertResponse(
        r.json()[key] == value,
        success=f"OK: {key} is valid",
        failed=f"FAILED: expecting {key} is {value}, but got {r.json()[key]}"
    )

def test():
    hooks = dict(response=print_request)

    # test_data
    from faker import Faker
    fake = Faker()
    first_name = fake.first_name()
    last_name = fake.last_name()
    user = {
        'username':first_name[0]+last_name,
        'firstname':first_name,
        'lastname':last_name,
        'email':fake.email(),
        'phone':fake.phone_number()
    }

    # test creation
    r = requests.post(
        API_URL+'/user',
        data=user,
        hooks=hooks
    )
    assertStatusCode(r, 200)
    assertHasKey(r, 'id')
    user_id = r.json()['id']

    # test get
    r = requests.get(
        API_URL+f'/user/{user_id}',
        hooks=hooks
    )
    assertStatusCode(r, 200)
    assertHasValue(r, 'username', user['username'])
    assertHasValue(r, 'firstname', user['firstname'])
    assertHasValue(r, 'lastname', user['lastname'])
    assertHasValue(r, 'email', user['email'])
    assertHasValue(r, 'phone', user['phone'])

    # test update
    # really patch
    r = requests.put(
        API_URL+f'/user/{user_id}',
        data={"lastname": "Krasilnikov"},
        hooks=hooks
    )
    assertStatusCode(r, 200)
    assertHasValue(r, 'lastname', 'Krasilnikov')

    # test delete
    r = requests.delete(
        API_URL+f'/user/{user_id}',
        hooks=hooks
    )
    assertStatusCode(r, 201)

    r = requests.get(
        API_URL+f'/user/{user_id}',
        hooks=hooks
    )
    assertStatusCode(r, 404)

if __name__=='__main__':
    print(f'Start tests {API_URL}')
    test()
