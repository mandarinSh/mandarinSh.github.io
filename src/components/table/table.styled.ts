import {
  styled,
  Box,
  Paper,
  Button,
  IconButton,
  Stack,
  TableRow,
  TableCell,
  TextField,
  Checkbox as MuiCheckbox,
} from '@mui/material';

export const PageContainer = styled(Box)({
  padding: '24px 0',
});

export const HeaderStack = styled(Stack)({
  marginBottom: 30,
  paddingInline: 30,
  height: 105,
  backgroundColor: 'var(--color-white)',
});

export const SearchField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: 'var(--color-background-alt)',
    '& fieldset': {
      border: 'none',
    },
  },
});

export const TablePaper = styled(Paper)(() => ({
  borderRadius: 12,
  overflow: 'hidden',
  padding: 30,
  paddingBottom: 37,
  display: 'flex',
  flexDirection: 'column',
  gap: 40,

  '&& .MuiTableRow-root': {
    backgroundColor: 'unset',
  }
}));

export const SubHeaderStack = styled(Stack)({
  height: 42,
});

export const SyncImg = styled('img')({
  width: 22,
  height: 22,
});

export const SyncButton = styled(IconButton)({
  borderRadius: 8,
  border: '1px solid var(--color-border-medium)',
  width: 42,
  height: 42,
});

export const AddButton = styled(Button)({
  borderRadius: 8,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: 14,
  padding: '10px 20px',
  backgroundColor: 'var(--color-primary)',
});

export const HeaderRow = styled(TableRow)({
  backgroundColor: 'var(--color-background-header-row)',
});

export const HeaderCell = styled(TableCell)({
  color: 'var(--color-text-header)',
});

export const CheckboxCell = styled(TableCell)({

});

export const Checkbox = styled(MuiCheckbox)({

  color: 'var(--color-text-header)',
  '&.MuiCheckbox-input': {
    width: 22,
    height: 22,
    borderRadius: 4,
    border: '1px solid var(--color-border-medium)',
    overflow: 'hidden',
  },

  '&.Mui-checked': {
    color: 'var(--color-primary)',
  },
});

export const SelectableRow = styled(TableRow)({
  position: 'relative',
  '&.Mui-selected': {
    backgroundColor: 'var(--color-selected-row)',
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'var(--color-selected-row-hover)',
  },
  '&.Mui-selected td:first-of-type::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 1,
    bottom: 1,
    width: 3,
    backgroundColor: 'var(--color-accent)',
  },
  '& .MuiTableCell-root': {
    paddingBlock: 12,
  },
});

export const ProductNameBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});



export const AddActionButton = styled(IconButton)({
  backgroundColor: 'var(--color-primary)',
  borderRadius: 23,
  color: 'var(--color-white)',
  width: 52,
  height: 28,
  '&:hover': {
    backgroundColor: 'var(--color-primary-action-hover)',
  },
});

export const MoreActionsButton = styled(IconButton)({
  color: 'var(--color-text-muted)',
  backgroundColor: 'transparent',
  width: 28,
  height: 28,
  '&:hover': {
    backgroundColor: 'var(--color-background)',
  },
});

export const PaginationStack = styled(Stack)(() => ({
  padding: '16px 24px',
}));

export const PageNumberButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  minWidth: 32,
  height: 32,
  borderRadius: 4,
  fontWeight: isActive ? 500 : 400,
  ...(isActive
    ? {
      backgroundColor: 'var(--color-accent-pagination)',
      boxShadow: 'unset',
    }
    : {
        color: theme.palette.text.secondary,
        border: `1px solid ${theme.palette.divider}`,
      }),
}));

export const PaginationIcon = styled('img')({
  width: 20,
  height: 20,
});

export const CenterBox = styled(Box)({
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
});

export const SearchForm = styled('form')({
  flex: 1,
  maxWidth: 560,
  '&&': {
    margin: 'auto'
  },

});

export const DialogActionsWrapper = styled(Box)({
  padding: '0 24px 16px',
});

export const CancelButton = styled(Button)({
  textTransform: 'none',
});

export const DialogSubmitButton = styled(Button)({
  textTransform: 'none',
  borderRadius: 8,
});

export const PriceInteger = styled('span')({
  fontFamily: '"Roboto Mono", monospace',
  fontSize: 16,
  lineHeight: '110%',
});

export const PriceDecimal = styled('span')({
  fontFamily: '"Roboto Mono", monospace',
  fontSize: 16,
  lineHeight: '110%',
  color: 'var(--color-text-muted)',
});

export const ThreeDotsImage = styled('img')({
  width: 32,
  height: 32,
  objectFit: 'contain',
});
