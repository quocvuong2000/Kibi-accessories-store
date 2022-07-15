import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";

import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";

import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";

import { LanguageUtils } from "../utils";

const messages = LanguageUtils.getFlattenedMessages();

function IntlProviderWrapper(props) {
  const user = useSelector((state) => state.user);
  const { children } = props;
  // const language = useSelector(selectLanguage);
  // let user = useSelector(selectUser);

  return (
    <>
      <IntlProvider
        locale={user.language}
        messages={messages[user?.language]}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </>
  );
}

export default IntlProviderWrapper;
