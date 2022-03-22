import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export default i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    'Cancel': 'Cancel',
                    'Dashboard':'Dashboard',
                    'Stats':'Stats',
                    'Patients':'Patients',
                    'Starred':'Starred',
                    'Settings':'Settings',
                    'About':'About',
                    'Log out':'Log out',
                    'Select':'Select',
                    'Account':'Account',
                    'January':'January',
                    'February':'February',
                    'March':'March',
                    'April':'April',
                    'May':'May',
                    'June':'June',
                    'July':'July',
                    'August':'August',
                    'September':'September',
                    'October':'October',
                    'November':'November',
                    'December':'December',
                    'White blood cells':'White blood cells',
                    'Red blood cells':'Red blood cells',
                    'Blood cells':'Blood cells',
                },
            },
            sk: {
                translation: {
                    'Cancel': 'Zrušiť',
                    'Dashboard':'Panel',
                    'Stats':'Štatistiky',
                    'Patients':'Pacienti',
                    'Starred':'Označené',
                    'Settings':'Nastavenia',
                    'About':'O programe',
                    'Log out':'Odhlásiť sa',
                    'Select':'Vyber',
                    'Account':'Konto',
                    'January':'Január',
                    'February':'Február',
                    'March':'Marec',
                    'April':'Apríl',
                    'May':'Máj',
                    'June':'Jún',
                    'July':'Júl',
                    'August':'August',
                    'September':'September',
                    'October':'Október',
                    'November':'November',
                    'December':'December',
                    'White blood cells':'Biele krvinky',
                    'Red blood cells':'Červené krvinky',
                    'Blood cells':'Krvinky',
                },
            },
        },
        lng: "sk",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });
