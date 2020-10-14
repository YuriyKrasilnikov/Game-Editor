import React, {
    useState,
    useEffect
} from 'react';


const Navbar = ( ) => {

    return (
        <>
            <div>
                <a href="https://arch.homework/oauth2/">
                Вход
                </a>
                {' | '}
                <a href="https://arch.homework/oauth2/auth">
                Проверка авторизации
                </a>
                {' | '}
                <a href="https://arch.homework/oauth2/userinfo">
                Информация
                </a>
                {' | '}
                <a href="https://arch.homework/oauth2/sign_out">
                Выход
                </a>
            </div>
        </>
    );
  }

export { Navbar };