import { Skeleton } from '@mui/material';

import * as S from './productThumbnail.styled';

interface ProductThumbnailProps {
  src: string;
  alt: string;
  showSkeleton?: boolean;
}

export const ProductThumbnail: React.FC<ProductThumbnailProps> = ({
  src,
  alt,
  showSkeleton = false,
}) => {
  if (showSkeleton) {
    return (
      <S.SkeletonBox >
        <Skeleton variant="rectangular" width={48} height={48} />
      </S.SkeletonBox>
    );
  }

  return (
    <S.ProductThumbnail
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
};
