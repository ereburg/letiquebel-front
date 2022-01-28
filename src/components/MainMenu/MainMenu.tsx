import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import {
  ROUTES,
  DYNAMIC_ROUTES,
  CUSTOM_CATEGORIES,
  MESSENGERS,
} from '@constants/common';

import { RootState } from '@store/reducers';

import * as S from './MainMenu.style';

type Props = {
  isVisible: boolean;
  setVisible: () => void;
};

function MainMenu({ isVisible, setVisible }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: categoryList } = useSelector(
    (state: RootState) => state.categoryList
  );
  const { phone, email, viber, telegram, whatsapp, instagram } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  const messengers: typeof MESSENGERS = JSON.parse(JSON.stringify(MESSENGERS));
  messengers.whatsapp.url = whatsapp ? MESSENGERS.whatsapp.url + whatsapp : '';
  messengers.telegram.url = telegram ? MESSENGERS.telegram.url + telegram : '';
  messengers.viber.url = viber ? MESSENGERS.viber.url + viber : '';

  const messengerList = Object.values(messengers).filter(
    (messenger) => messenger.url !== ''
  );

  useEffect(() => {
    const containerElem = containerRef.current;

    if (isVisible && containerElem) {
      disableBodyScroll(containerElem, {
        reserveScrollBarGap: true,
      });
    }

    return () => clearAllBodyScrollLocks();
  }, [isVisible]);

  return (
    <S.Wrapper isVisible={isVisible}>
      <S.Overlay onClick={setVisible} />
      <S.Container ref={containerRef}>
        <S.CloseButton onClick={setVisible} />
        <S.Scroll>
          <S.Content
            itemType="http://schema.org/SiteNavigationElement"
            itemScope
          >
            <S.MenuToggle onClick={setVisible}>
              <span />
            </S.MenuToggle>
            <S.ContentBlock>
              <S.LinksList itemType="http://schema.org/ItemList" itemScope>
                <S.LinksItem
                  itemProp="itemListElement"
                  itemType="http://schema.org/ItemList"
                  itemScope
                >
                  <S.MainLink itemProp="url" to={ROUTES.catalog.url}>
                    <meta itemProp="name" content="Каталог" />
                    Каталог
                  </S.MainLink>
                  <S.SubLinksList>
                    {categoryList.map((category, index) => {
                      const to = category.custom
                        ? `${CUSTOM_CATEGORIES[category.alias].url}`
                        : `${DYNAMIC_ROUTES.category}/${category.alias}`;
                      const href = !category.custom
                        ? `${DYNAMIC_ROUTES.category}/[alias]`
                        : undefined;

                      return (
                        <S.SubLinksItem key={index}>
                          <S.SubLink href={href} to={to}>
                            {category.title}
                          </S.SubLink>
                        </S.SubLinksItem>
                      );
                    })}
                  </S.SubLinksList>
                </S.LinksItem>
              </S.LinksList>
            </S.ContentBlock>
            <S.ContentBlock>
              <S.LinksList itemType="http://schema.org/ItemList" itemScope>
                <S.LinksItem
                  itemProp="itemListElement"
                  itemType="http://schema.org/ItemList"
                  itemScope
                >
                  <S.MainLink itemProp="url" to={ROUTES.shops.url}>
                    <meta itemProp="name" content={ROUTES.shops.label} />
                    {ROUTES.shops.label}
                  </S.MainLink>
                </S.LinksItem>
                <S.LinksItem
                  itemProp="itemListElement"
                  itemType="http://schema.org/ItemList"
                  itemScope
                >
                  <S.MainLink itemProp="url" to={ROUTES.delivery.url}>
                    <meta itemProp="name" content={ROUTES.delivery.label} />
                    {ROUTES.delivery.label}
                  </S.MainLink>
                </S.LinksItem>
                <S.LinksItem
                  itemProp="itemListElement"
                  itemType="http://schema.org/ItemList"
                  itemScope
                >
                  <S.MainLink itemProp="url" to={ROUTES.faq.url}>
                    <meta itemProp="name" content={ROUTES.faq.label} />
                    {ROUTES.faq.label}
                  </S.MainLink>
                </S.LinksItem>
              </S.LinksList>
              <S.LinksList>
                {phone ? (
                  <S.ContactLinksItem>
                    <S.ContactLink href={`tel:${phone}`}>{phone}</S.ContactLink>
                  </S.ContactLinksItem>
                ) : null}
                {messengerList.length ? (
                  <S.ContactLinksItem>
                    <S.ContactLabel>
                      Возникли вопросы по доставке заказа?
                    </S.ContactLabel>
                    {Object.values(messengerList).map((messenger, index) => (
                      <div key={index}>
                        <S.ContactButton
                          variant="underline"
                          href={messenger.url}
                          target="_blank"
                        >
                          {`Написать в ${messenger.label}`}
                        </S.ContactButton>
                      </div>
                    ))}
                  </S.ContactLinksItem>
                ) : null}
                {email ? (
                  <S.ContactLinksItem>
                    <S.ContactLink href={`mailto:${email}`}>
                      {email}
                    </S.ContactLink>
                  </S.ContactLinksItem>
                ) : null}
                {instagram ? (
                  <S.ContactLinksItem>
                    <S.ContactLink href={instagram} target="_blank">
                      instagram
                    </S.ContactLink>
                  </S.ContactLinksItem>
                ) : null}
              </S.LinksList>
            </S.ContentBlock>
          </S.Content>
        </S.Scroll>
      </S.Container>
    </S.Wrapper>
  );
}

export default MainMenu;
