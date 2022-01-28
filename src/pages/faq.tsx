import React from 'react';
import { NextPage } from 'next';
import Error from '@pages/_error';

import { QuestionGroup } from '@typings/models';
import { getQuestionGroupList } from '@services/requests';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Faq from '@modules/Faq';

type Props =
  | {
      pageType: 'FAQ';
      questionGroupList: Array<QuestionGroup>;
    }
  | {
      pageType: 'ERROR';
      statusCode: number;
    };

const FaqPage: NextPage<Props> = (props) => {
  if (props.pageType === 'ERROR') {
    return <Error statusCode={props.statusCode} />;
  }

  return (
    <Page title="FAQ - Letique Cosmetics">
      <Layout>
        <Faq questionGroupList={props.questionGroupList} />
      </Layout>
    </Page>
  );
};

FaqPage.getInitialProps = async () => {
  try {
    return {
      pageType: 'FAQ',
      questionGroupList: await getQuestionGroupList(),
    } as Props;
  } catch (error) {
    return { pageType: 'ERROR', statusCode: 500 } as Props;
  }
};

export default FaqPage;
