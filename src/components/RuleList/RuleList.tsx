import React from 'react';

import { Rules } from './RuleList.types';

import * as S from './RuleList.style';

type Props = {
  ruleList: Rules;
};

function RuleList({ ruleList }: Props) {
  let realIndex = 0;

  return (
    <S.ListContainer>
      {ruleList.map((item, index) => {
        let realSubIndex = 0;

        return (
          <S.ListGroup key={index}>
            {item.title ? <span>{`${++realIndex}. ${item.title}`}</span> : null}
            <S.ListContainer>
              {item.list.map((jtem, jndex) => {
                const listItemIndex = !jtem.noNum
                  ? `${realIndex}.${++realSubIndex}. `
                  : '';

                return (
                  <S.ListItem key={jndex}>
                    {jtem.text ? (
                      <S.TextContent
                        dangerouslySetInnerHTML={{
                          __html: `${listItemIndex}${jtem.text}`,
                        }}
                      />
                    ) : null}
                    {jtem.subList ? (
                      <S.ListContainer>
                        {jtem.subList.map((ktem, kndex) => {
                          const subListItemIndex = !jtem.noNum
                            ? `${realIndex}.${realSubIndex}.${kndex + 1}. `
                            : '';

                          return (
                            <S.ListSubItem key={jndex + kndex}>
                              <S.TextContent
                                dangerouslySetInnerHTML={{
                                  __html: `${subListItemIndex}${ktem}`,
                                }}
                              />
                            </S.ListSubItem>
                          );
                        })}
                      </S.ListContainer>
                    ) : null}
                    {jtem.dashList ? (
                      <S.ListContainer>
                        {jtem.dashList.map((ktem, kndex) => (
                          <S.ListSubItem key={jndex + kndex}>
                            <S.TextContent
                              dangerouslySetInnerHTML={{ __html: `- ${ktem}` }}
                            />
                          </S.ListSubItem>
                        ))}
                      </S.ListContainer>
                    ) : null}
                  </S.ListItem>
                );
              })}
            </S.ListContainer>
          </S.ListGroup>
        );
      })}
    </S.ListContainer>
  );
}

export default RuleList;
