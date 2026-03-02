import { Box, styled } from "@mui/material";

export const ProductThumbnail = styled('img')({
  width: 48,
  height: 48,
  borderRadius: 4,
  border: '1px solid var(--color-border-thumbnail)',
  objectFit: 'cover',
  backgroundColor: 'var(--color-border-thumbnail)',
  flexShrink: 0,
});

export const SkeletonBox = styled(Box)({
    width: 48,
    height: 48,
    borderRadius: 1,
    border: '1px solid var(--color-border-thumbnail)',
    backgroundColor: 'var(color-selected-row-hover)',
    flexShrink: 0,
});
