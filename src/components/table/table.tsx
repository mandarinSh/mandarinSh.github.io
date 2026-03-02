import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableCell,
  LinearProgress,
  IconButton,
  Stack,
  InputAdornment,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Button,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import { useProductsQuery } from "@/hooks";
import { Product } from "@/api/product";
import * as S from "./table.styled";
import { Checkbox } from "../checkbox";
import { ProductThumbnail } from "../product-thumbnail";

const ITEMS_PER_PAGE = 20;
const SORT_STORAGE_KEY = "table-sort";

type SortField = "price" | "rating" | "";
type SortOrder = "asc" | "desc";

const getSavedSort = (): { field: SortField; order: SortOrder } => {
  try {
    const saved = sessionStorage.getItem(SORT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { field: parsed.field || "", order: parsed.order || "asc" };
    }
  } catch {
    /* ignored */
  }
  return { field: "", order: "asc" };
};

const formatPrice = (price: number): { integer: string; decimal: string } => {
  const rubles = Math.round(price * 90);
  const formatted = rubles.toLocaleString("ru-RU");
  return { integer: formatted, decimal: "00" };
};

const getRatingColor = (rating: number): string => {
  if (rating < 3) return "var(--color-rating-danger)";
  return "var(--color-text-dark)";
};

export const TablePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const [sortField, setSortField] = useState<SortField>(getSavedSort().field);
  const [sortOrder, setSortOrder] = useState<SortOrder>(getSavedSort().order);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    brand: "",
    sku: "",
  });
  const [newProductErrors, setNewProductErrors] = useState<
    Record<string, string>
  >({});
  const [toastOpen, setToastOpen] = useState(false);

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data, isLoading, error, refetch } = useProductsQuery({
    limit: ITEMS_PER_PAGE,
    skip,
    search: searchQuery,
    sortBy: sortField || undefined,
    order: sortField ? sortOrder : undefined,
  });

  const products: Product[] = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleSort = useCallback(
    (field: SortField) => {
      let newOrder: SortOrder = "asc";
      let newField: SortField = field;

      if (sortField === field) {
        if (sortOrder === "asc") {
          newOrder = "desc";
        } else {
          newField = "";
          newOrder = "asc";
        }
      }

      setSortField(newField);
      setSortOrder(newOrder);
      setCurrentPage(1);
      sessionStorage.setItem(
        SORT_STORAGE_KEY,
        JSON.stringify({ field: newField, order: newOrder }),
      );
    },
    [sortField, sortOrder],
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(search);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!e.target.value.trim()) {
      setSearchQuery("");
      setCurrentPage(1);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(new Set(products.map((p) => p.id)));
    } else {
      setSelected(new Set());
    }
  };

  const handleSelectRow = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddProduct = () => {
    const errs: Record<string, string> = {};
    if (!newProduct.title.trim()) errs.title = "Обязательное поле";
    if (!newProduct.price.trim()) errs.price = "Обязательное поле";
    else if (isNaN(Number(newProduct.price)) || Number(newProduct.price) <= 0)
      errs.price = "Введите корректную цену";
    if (Object.keys(errs).length > 0) {
      setNewProductErrors(errs);
      return;
    }
    setAddDialogOpen(false);
    setNewProduct({ title: "", price: "", brand: "", sku: "" });
    setNewProductErrors({});
    setToastOpen(true);
  };

  const allSelected =
    products.length > 0 && products.every((p) => selected.has(p.id));
  const someSelected = products.some((p) => selected.has(p.id)) && !allSelected;

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  const showFrom = total === 0 ? 0 : skip + 1;
  const showTo = Math.min(skip + ITEMS_PER_PAGE, total);

  if (error) {
    return (
      <S.CenterBox>
        <Typography variant="h6" color="error">
          Ошибка загрузки
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {(error as Error).message}
        </Typography>
        <Button variant="contained" onClick={() => refetch()}>
          Повторить
        </Button>
      </S.CenterBox>
    );
  }

  return (
    <S.PageContainer>
      <S.HeaderStack direction="row" alignItems="center" spacing={3}>
        <Typography variant="h5" fontWeight={700}>
          Товары
        </Typography>
        <S.SearchForm onSubmit={handleSearch}>
          <S.SearchField
            size="small"
            placeholder="Найти"
            value={search}
            onChange={handleSearchChange}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </S.SearchForm>
      </S.HeaderStack>

      <S.TablePaper elevation={0}>
        <S.SubHeaderStack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" fontWeight={600} fontSize={20}>
            Все позиции
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <S.SyncButton size="small" onClick={() => refetch()} color="default">
              <S.SyncImg src="ArrowsClockwise.png" alt="Update table" />
            </S.SyncButton>
            <S.AddButton
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              size="large"
              onClick={() => setAddDialogOpen(true)}
            >
              Добавить
            </S.AddButton>
          </Stack>
        </S.SubHeaderStack>

        <MuiTable size="medium">
          <TableHead>
            <S.HeaderRow>
              <S.CheckboxCell padding="checkbox">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={(_, checked) => handleSelectAll(checked)}
                />
              </S.CheckboxCell>
              <S.HeaderCell>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize={16}
                  noWrap
                  lineHeight="14px"
                >
                  Наименование
                </Typography>
              </S.HeaderCell>
              <S.HeaderCell>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize={16}
                  noWrap
                  lineHeight="14px"
                >
                  Вендор
                </Typography>
              </S.HeaderCell>
              <S.HeaderCell>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize={16}
                  noWrap
                  lineHeight="14px"
                >
                  Артикул
                </Typography>
              </S.HeaderCell>
              <S.HeaderCell align="center">
                <TableSortLabel
                  active={sortField === "rating"}
                  direction={sortField === "rating" ? sortOrder : "asc"}
                  onClick={() => handleSort("rating")}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    fontSize={16}
                    noWrap
                    lineHeight="14px"
                  >
                    Оценка
                  </Typography>
                </TableSortLabel>
              </S.HeaderCell>
              <S.HeaderCell align="right">
                <TableSortLabel
                  active={sortField === "price"}
                  direction={sortField === "price" ? sortOrder : "asc"}
                  onClick={() => handleSort("price")}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    fontSize={16}
                    noWrap
                    lineHeight="14px"
                  >
                    Цена, ₽
                  </Typography>
                </TableSortLabel>
              </S.HeaderCell>
              <S.HeaderCell align="right" />
            </S.HeaderRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <S.SelectableRow>
                <TableCell colSpan={7} >
                  <LinearProgress />
                </TableCell>
              </S.SelectableRow>
            )}
            {!isLoading && products.map((product) => {
              const isSelected = selected.has(product.id);
              return (
                <S.SelectableRow key={product.id} hover selected={isSelected}>
                  <S.CheckboxCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleSelectRow(product.id)}
                    />
                  </S.CheckboxCell>

                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <ProductThumbnail
                        src={product.thumbnail}
                        alt={product.title}
                      />
                      <S.ProductNameBox>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          fontSize={16}
                          noWrap
                          lineHeight="14px"
                        >
                          {product.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight={500}
                          fontSize={14}
                          lineHeight="14px"
                          textTransform="capitalize"
                          noWrap
                        >
                          {product.category}
                        </Typography>
                      </S.ProductNameBox>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      fontSize={16}
                      noWrap
                      lineHeight="14px"
                    >
                      {product.brand || "—"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body1" color="text.secondary">
                      {product.sku || "—"}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color={getRatingColor(product.rating)}
                    >
                      <Box component="span" fontWeight={600}>
                        {product.rating.toFixed(1)}
                      </Box>
                      /5
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <S.PriceInteger>
                      {formatPrice(product.price).integer},
                    </S.PriceInteger>
                    <S.PriceDecimal>
                      {formatPrice(product.price).decimal}
                    </S.PriceDecimal>
                  </TableCell>

                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing="32px"
                      justifyContent="flex-end"
                    >
                      <S.AddActionButton size="small">
                        <AddIcon fontSize="small" />
                      </S.AddActionButton>
                      <S.MoreActionsButton size="small">
                        <S.ThreeDotsImage
                          src="/DotsThreeCircle.png"
                          alt="More actions"
                        />
                      </S.MoreActionsButton>
                    </Stack>
                  </TableCell>
                </S.SelectableRow>
              );
            })}

            {!isLoading && products.length === 0 && (
              <S.SelectableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary">
                    Товары не найдены
                  </Typography>
                </TableCell>
              </S.SelectableRow>
            )}
          </TableBody>
        </MuiTable>

        {total > 0 && (
          <S.PaginationStack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" color="text.secondary" fontSize={18}>
              Показано{" "}
              <Box component="span" color="text.primary">
                {showFrom}-{showTo}
              </Box>{" "}
              из {" "}
              <Box component="span" color="text.primary">
                 {total}
              </Box>             
            </Typography>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconButton
                size="small"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <S.PaginationIcon src="CaretLeft.png" alt="Left arrow" />
              </IconButton>

              {pageNumbers.map((num) => (
                <S.PageNumberButton
                  key={num}
                  size="small"
                  variant={num === currentPage ? "contained" : "text"}
                  isActive={num === currentPage}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </S.PageNumberButton>
              ))}

              <IconButton
                size="small"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <S.PaginationIcon src="CaretRight.png" alt="Right arrow" />
              </IconButton>
            </Stack>
          </S.PaginationStack>
        )}
      </S.TablePaper>

      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <DialogTitle fontWeight={600}>Добавить товар</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Наименование"
              value={newProduct.title}
              onChange={(e) => {
                setNewProduct((p) => ({ ...p, title: e.target.value }));
                if (newProductErrors.title)
                  setNewProductErrors((prev) => ({ ...prev, title: "" }));
              }}
              fullWidth
              size="small"
              error={!!newProductErrors.title}
              helperText={newProductErrors.title}
            />
            <TextField
              label="Цена"
              value={newProduct.price}
              onChange={(e) => {
                setNewProduct((p) => ({ ...p, price: e.target.value }));
                if (newProductErrors.price)
                  setNewProductErrors((prev) => ({ ...prev, price: "" }));
              }}
              fullWidth
              size="small"
              error={!!newProductErrors.price}
              helperText={newProductErrors.price}
            />
            <TextField
              label="Вендор"
              value={newProduct.brand}
              onChange={(e) =>
                setNewProduct((p) => ({ ...p, brand: e.target.value }))
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Артикул"
              value={newProduct.sku}
              onChange={(e) =>
                setNewProduct((p) => ({ ...p, sku: e.target.value }))
              }
              fullWidth
              size="small"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <S.CancelButton
            onClick={() => {
              setAddDialogOpen(false);
              setNewProductErrors({});
            }}
          >
            Отмена
          </S.CancelButton>
          <S.DialogSubmitButton variant="contained" onClick={handleAddProduct}>
            Добавить
          </S.DialogSubmitButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="filled"
        >
          Товар успешно добавлен
        </Alert>
      </Snackbar>
    </S.PageContainer>
  );
};
