import React, {
  useContext
} from 'react';

import { StatusContext } from '../../grpc/context'

import { GetAdvanced } from './GetAdvanced'

import { Insert as InsertProfile  } from './Profiles/Insert'
import { Remove as RemoveProfile  } from './Profiles/Remove'
import { Update as UpdateProfile  } from './Profiles/Update'

import { Buy as BuyBilling  } from './Billing/Buy'
import { Paid as PaidBilling  } from './Billing/Paid'

const Admin = ( ) => {

  const [ status, _ ] = useContext(StatusContext)

  //---

  return (
    <>
      <h2>Регистрация пользователя и вход пользователя:</h2>
      {
        status && status.nickname
        ? <> 
            {"Пользователь "+status.nickname+" — авторизирован. Чтобы выйти нажмите: "}
            <a href='/oauth2/sign_out'>
              Выход
            </a>

            <GetAdvanced />
            <h2>{'—'.repeat(30)}</h2>
            <InsertProfile />
            <h2>{'—'.repeat(30)}</h2>
            <RemoveProfile />
            <h2>{'—'.repeat(30)}</h2>
            <UpdateProfile nickname={status.nickname} />
            <h2>{'—'.repeat(30)}</h2>
            <PaidBilling />
            <h2>{'—'.repeat(30)}</h2>
            <BuyBilling />
            <h2>{'—'.repeat(30)}</h2>
          </>
        : <>
            {"Пользователь не авторизирован! Чтобы войти или зарегистрироваться нажмите: "}
            <a href="/oauth2/">
              Вход
            </a>
        </>
      }
    </>
  );
}

export { Admin };
