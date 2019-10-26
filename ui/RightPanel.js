import React from 'react';

import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { RightSidePanel, FlexContainer, ContentWrapper } from '@atlaskit/right-side-panel';
import SectionMessage from '@atlaskit/section-message';
import Page16Icon from '@atlaskit/icon-object/glyph/page/16';
import PageHeader from '@atlaskit/page-header';
import Page24Icon from '@atlaskit/icon-object/glyph/page/24';

const Stats = () => {
  return (
    <div>a</div>
  )
}

function RightPanel(props) {
  return (
      <FlexContainer id="RightSidePanelExample">
        <ContentWrapper>
          <RightSidePanel isOpen={props.isOpen} attachPanelTo="RightSidePanelExample">
            <div className="panel-header">
              <div><Page24Icon /></div>
              <div onClick={props.closePanel}><EditorCloseIcon /></div>
            </div>
            <SectionMessage appearance="info" title="Status">
              <Stats />
            </SectionMessage>
            <SectionMessage appearance="warning" title="Status">
              <Stats />
            </SectionMessage>
            <SectionMessage appearance="error" title="Status">
              <Stats />
            </SectionMessage>
            <SectionMessage appearance="confirmation" title="Status">
              <Stats />
            </SectionMessage>
            <SectionMessage appearance="change" title="Status">
              <Stats />
            </SectionMessage>
            <SectionMessage appearance="info" title="Status">
              <Stats />
            </SectionMessage>
            <SectionMessage appearance="warning" title="Status">
              <Stats />
            </SectionMessage>
            <SectionMessage appearance="error" title="Status">
              <Stats />
            </SectionMessage>
            <SectionMessage appearance="confirmation" title="Status">
              <Stats />
            </SectionMessage>
          </RightSidePanel>
        </ContentWrapper>
      </FlexContainer>
    );
}

export default RightPanel;