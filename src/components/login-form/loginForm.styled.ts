import { styled, Box, Paper, Button, TextField, Alert } from '@mui/material';

export const PageWrapper = styled(Box)({
  minHeight: '100vh',
  backgroundColor: 'var(--color-background)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
});

export const FormCardOuter = styled(Box)({
  padding: 6,
  borderRadius: 20,
  backgroundColor: 'var(--color-white)',
  boxShadow: 'var(--shadow-card)',
});

export const FormCard = styled(Paper)({
  width: 500,
  maxWidth: '100%',
  padding: 40,
  borderRadius: 16,
  border: '1px solid var(--color-border-light)',
  background: 'var(--gradient-card)',
  boxShadow: 'none',
  boxSizing: 'border-box',
});

export const LogoOuter = styled(Box)({
  padding: 3,
  borderRadius: '50%',
  backgroundColor: 'var(--color-white)',
  boxShadow: 'var(--shadow-logo)',
});

export const LogoCircle = styled(Box)({
  width: 52,
  height: 52,
  borderRadius: '50%',
  border: '1px solid var(--color-border-light)',
  background: 'var(--gradient-card)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const LogoImage = styled('img')({
  width: 28,
  height: 28,
  objectFit: 'contain',
});

export const SubmitButton = styled(Button)({
  borderRadius: 12,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  padding: '8px 16px',
  backgroundColor: 'var(--color-primary)',
  border: '1px solid var(--color-primary-stroke)',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: 'var(--color-primary-hover)',
    border: '1px solid var(--color-primary-stroke)',
  },
});

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    height: 54,
    backgroundColor: 'var(--color-white)',
  },
  '& legend': {
    display: 'none',
  },
});

export const FullWidthAlert = styled(Alert)({
  width: '100%',
});

export const FieldWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  '& .MuiOutlinedInput-notchedOutline': {
    top: -2,
    bottom: -2,
  }
});
