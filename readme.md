# Просто сервер когортной статистик

## Зависимости

- mysql >= 5
- nodejs >= 0.10

## Как развернуть

- Установить mysql и nodejs
- Выполнить установку node модулей `npm i`
- Развернуть базу `init/dbinit.sql`
- Скопировать `config/application-example.yaml` в `config/application.yaml`
- Настроить конфиг `config/application.yaml`
- Запускаем сервер `node index.js`

## API

Все ответы от api приходят в формате json { success: true|false, [result] }

- `/api/userRegister?userId=<userId>` Записать событие регистрации пользователя
- `/api/userLogin?userId=<userId>` Записать событие входа пользователя
- `/api/userPurchase?userId=<userId>` Записать событие совершения покипки пользователем
- `/api/cohort?date=<date>` Запросить статистику на дату в формате (yyyy-mm-dd). Если дату не указать то берется за сегодня


## Index страница

По умолчанию возвращает статистику за последние 20 дней. В парамтре `count` можно указать любой другое число.
