# Лингво (Expo + Supabase)

## Обязательно: база данных Supabase

Ошибка **«Could not find the table 'public.words'…»** значит, что в **вашем** проекте Supabase ещё **нет таблицы** `words`. Код приложения здесь ни при чём.

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard) → **ваш проект** (тот же, чей URL в `EXPO_PUBLIC_SUPABASE_URL` в `my-app/.env`).
2. **SQL Editor** → New query.
3. Скопируйте **весь** файл [`docs/supabase-setup.sql`](./docs/supabase-setup.sql) в редактор и нажмите **Run**.
4. Проверьте **Table Editor** — должна появиться таблица `words`.
5. Перезапустите приложение (pull-to-refresh на главной или кнопка «Повторить»).

Ключ в `.env` должен быть из **Settings → API** того же проекта (`anon` / publishable).

---

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Env (в каталоге `my-app`)

   Скопируйте `.env.example` в `.env` и подставьте URL и ключ Supabase.

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
