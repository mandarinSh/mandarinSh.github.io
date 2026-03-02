import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
  Divider,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { useLoginMutation } from '@/hooks';
import * as S from './loginForm.styled';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const loginMutation = useLoginMutation();

  const validate = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) {
      newErrors.username = 'Введите логин';
    }
    if (!password.trim()) {
      newErrors.password = 'Введите пароль';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    loginMutation.mutate({
      username,
      password,
      rememberMe,
    });
  };

  const isLoading = loginMutation.isPending;

  return (
    <S.PageWrapper>
      <S.FormCardOuter>
        <S.FormCard elevation={0}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit} alignItems="center">
            <S.LogoOuter>
              <S.LogoCircle>
                <S.LogoImage src="/logo.png" alt="Logo" />
              </S.LogoCircle>
            </S.LogoOuter>

          <Box textAlign="center">
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Добро пожаловать!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Пожалуйста, авторизируйтесь
            </Typography>
          </Box>

          <S.FieldWrapper>
            <Typography variant="body2" fontWeight={500} >
              Логин
            </Typography>
            <S.StyledTextField
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
              }}
              disabled={isLoading}
              autoComplete="username"
              fullWidth
              error={!!errors.username}
              helperText={errors.username}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon fontSize="small" color="disabled" />
                    </InputAdornment>
                  ),
                  endAdornment: username ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setUsername('')} edge="end">
                        <ClearIcon fontSize="small" color="disabled" />
                      </IconButton>
                    </InputAdornment>
                  ) : undefined,
                },
              }}
            />
          </S.FieldWrapper>

          <S.FieldWrapper>
            <Typography variant="body2" fontWeight={500} >
              Пароль
            </Typography>
            <S.StyledTextField
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              disabled={isLoading}
              autoComplete="current-password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" color="disabled" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon fontSize="small" color="disabled" />
                        ) : (
                          <VisibilityOffOutlinedIcon fontSize="small" color="disabled" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </S.FieldWrapper>

          {loginMutation.isError && (
            <S.FullWidthAlert severity="error">
              {(loginMutation.error as Error)?.message || 'Ошибка авторизации'}
            </S.FullWidthAlert>
          )}

          <S.FieldWrapper>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  Запомнить данные
                </Typography>
              }
            />
          </S.FieldWrapper>

          <S.SubmitButton
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
          >
            {isLoading ? 'Входим…' : 'Войти'}
          </S.SubmitButton>

          <Divider flexItem>
            <Typography variant="caption" color="text.disabled">
              или
            </Typography>
          </Divider>

          <Typography variant="body2" color="text.secondary">
            Нет аккаунта?{' '}
            <Link href="#" underline="always" color="primary" fontWeight={500}>
              Создать
            </Link>
          </Typography>
          </Stack>
        </S.FormCard>
      </S.FormCardOuter>
    </S.PageWrapper>
  );
};
