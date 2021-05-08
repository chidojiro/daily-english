import { styled } from '../../../../styledComponents';
import classnames from 'classnames';

export const ModalFooter = styled.div.attrs<{ noBorder: boolean }>(({ noBorder }) => ({
  className: classnames('py-3 px-5', { 'border-border border-t': !noBorder }),
}))<{ noBorder: boolean }>``;
