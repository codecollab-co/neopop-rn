import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('expo-haptics', () => ({}), { virtual: true });

import { Row } from '../../src/components/layout/Row';
import { Column } from '../../src/components/layout/Column';
import { PageContainer } from '../../src/components/layout/PageContainer';
import { HorizontalDivider } from '../../src/components/layout/HorizontalDivider';
import { HorizontalSpacer } from '../../src/components/layout/HorizontalSpacer';
import { VerticalSpacer } from '../../src/components/layout/VerticalSpacer';

describe('Row', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Row />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Row>
        <Text>Child</Text>
      </Row>,
    );
    expect(getByText('Child')).toBeTruthy();
  });

  it('applies flexDirection="row"', () => {
    const { toJSON } = render(<Row><Text>A</Text></Row>);
    const tree = toJSON() as any;
    expect(tree.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ flexDirection: 'row' })]),
    );
  });

  it('renders with custom align and justify', () => {
    const { toJSON } = render(
      <Row align="flex-start" justify="space-between">
        <Text>A</Text>
        <Text>B</Text>
      </Row>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with gap prop', () => {
    const { toJSON } = render(
      <Row gap={8}>
        <Text>A</Text>
        <Text>B</Text>
      </Row>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with wrap=true', () => {
    const { toJSON } = render(
      <Row wrap>
        <Text>Wrapped</Text>
      </Row>,
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('Column', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Column />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Column>
        <Text>Child</Text>
      </Column>,
    );
    expect(getByText('Child')).toBeTruthy();
  });

  it('applies flexDirection="column"', () => {
    const { toJSON } = render(<Column><Text>A</Text></Column>);
    const tree = toJSON() as any;
    expect(tree.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ flexDirection: 'column' })]),
    );
  });

  it('renders with custom align, justify, and gap', () => {
    const { toJSON } = render(
      <Column align="center" justify="space-evenly" gap={12}>
        <Text>A</Text>
        <Text>B</Text>
      </Column>,
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('PageContainer', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<PageContainer />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <PageContainer>
        <Text>Page</Text>
      </PageContainer>,
    );
    expect(getByText('Page')).toBeTruthy();
  });

  it('applies backgroundColor prop', () => {
    const { toJSON } = render(
      <PageContainer backgroundColor="#ff0000">
        <Text>Red</Text>
      </PageContainer>,
    );
    const tree = toJSON() as any;
    expect(tree.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: '#ff0000' })]),
    );
  });

  it('applies custom paddingHorizontal and paddingVertical', () => {
    const { toJSON } = render(
      <PageContainer paddingHorizontal={24} paddingVertical={16}>
        <Text>Padded</Text>
      </PageContainer>,
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('HorizontalDivider', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<HorizontalDivider />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with custom color and thickness', () => {
    const { toJSON } = render(
      <HorizontalDivider color="#cccccc" thickness={2} />,
    );
    const tree = toJSON() as any;
    // style may be a plain object or an array — check with JSON for resilience
    const styleStr = JSON.stringify(tree.props.style);
    expect(styleStr).toContain('"backgroundColor":"#cccccc"');
    expect(styleStr).toContain('"height":2');
  });

  it('renders with custom marginVertical', () => {
    const { toJSON } = render(<HorizontalDivider marginVertical={8} />);
    expect(toJSON()).toBeTruthy();
  });
});

describe('HorizontalSpacer', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<HorizontalSpacer width={16} />);
    expect(toJSON()).toBeTruthy();
  });

  it('applies the correct width', () => {
    const { toJSON } = render(<HorizontalSpacer width={32} />);
    const tree = toJSON() as any;
    expect(tree.props.style).toEqual(expect.objectContaining({ width: 32 }));
  });
});

describe('VerticalSpacer', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<VerticalSpacer height={16} />);
    expect(toJSON()).toBeTruthy();
  });

  it('applies the correct height', () => {
    const { toJSON } = render(<VerticalSpacer height={24} />);
    const tree = toJSON() as any;
    expect(tree.props.style).toEqual(expect.objectContaining({ height: 24 }));
  });
});
