import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box,
  SelectChangeEvent,
  Slider,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { CreditCard } from './components/CreditCard';
import { CreditCard as CreditCardType } from './types/CreditCard';
import cardsData from '../cartoes.json';

function App() {
  const [cards, setCards] = useState<CreditCardType[]>([]);
  const [filteredCards, setFilteredCards] = useState<CreditCardType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minIncome, setMinIncome] = useState<number | null>(null);
  const [maxAnnualFee, setMaxAnnualFee] = useState<number | null>(null);
  const [hasVipLounge, setHasVipLounge] = useState<boolean | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    setCards(cardsData);
    setFilteredCards(cardsData);
  }, []);

  useEffect(() => {
    let filtered = cards;

    if (searchTerm) {
      filtered = filtered.filter(card => 
        card.card_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.bank_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBank) {
      filtered = filtered.filter(card => card.bank_name === selectedBank);
    }

    if (selectedType) {
      filtered = filtered.filter(card => card.card_type === selectedType);
    }

    if (selectedBrand) {
      filtered = filtered.filter(card => card.card_brand === selectedBrand);
    }

    if (minIncome !== null) {
      filtered = filtered.filter(card => 
        card.minimum_income !== null && card.minimum_income <= minIncome
      );
    }

    if (maxAnnualFee !== null) {
      filtered = filtered.filter(card => 
        card.annual_fee !== null && card.annual_fee <= maxAnnualFee
      );
    }

    if (hasVipLounge !== null) {
      filtered = filtered.filter(card => 
        hasVipLounge ? card.vip_lounge !== null : card.vip_lounge === null
      );
    }

    setFilteredCards(filtered);
  }, [searchTerm, selectedBank, selectedType, selectedBrand, minIncome, maxAnnualFee, hasVipLounge, cards]);

  // Update active filters
  useEffect(() => {
    const filters: string[] = [];
    
    if (selectedBank) filters.push(`Banco: ${selectedBank}`);
    if (selectedType) filters.push(`Tipo: ${selectedType}`);
    if (selectedBrand) filters.push(`Bandeira: ${selectedBrand}`);
    if (minIncome !== null) filters.push(`Renda mínima: R$ ${minIncome.toLocaleString()}`);
    if (maxAnnualFee !== null) filters.push(`Anuidade máxima: R$ ${maxAnnualFee.toLocaleString()}`);
    if (hasVipLounge !== null) filters.push(`Salas VIP: ${hasVipLounge ? 'Sim' : 'Não'}`);
    
    setActiveFilters(filters);
  }, [selectedBank, selectedType, selectedBrand, minIncome, maxAnnualFee, hasVipLounge]);

  const banks = Array.from(new Set(cards.map(card => card.bank_name)));
  const types = Array.from(new Set(cards.map(card => card.card_type).filter(Boolean)));
  const brands = Array.from(new Set(cards.map(card => card.card_brand)));
  
  const maxIncome = Math.max(...cards
    .map(card => card.minimum_income || 0)
    .filter(income => income > 0)
  );
  
  const maxFee = Math.max(...cards
    .map(card => card.annual_fee || 0)
    .filter(fee => fee > 0)
  );

  const handleBankChange = (event: SelectChangeEvent) => {
    setSelectedBank(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

  const handleBrandChange = (event: SelectChangeEvent) => {
    setSelectedBrand(event.target.value);
  };

  const handleMinIncomeChange = (_event: Event, newValue: number | number[]) => {
    setMinIncome(newValue as number);
  };

  const handleMaxAnnualFeeChange = (_event: Event, newValue: number | number[]) => {
    setMaxAnnualFee(newValue as number);
  };

  const handleVipLoungeChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setHasVipLounge(value === 'true' ? true : value === 'false' ? false : null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBank('');
    setSelectedType('');
    setSelectedBrand('');
    setMinIncome(null);
    setMaxAnnualFee(null);
    setHasVipLounge(null);
  };

  const removeFilter = (filterToRemove: string) => {
    if (filterToRemove.startsWith('Banco: ')) {
      setSelectedBank('');
    } else if (filterToRemove.startsWith('Tipo: ')) {
      setSelectedType('');
    } else if (filterToRemove.startsWith('Bandeira: ')) {
      setSelectedBrand('');
    } else if (filterToRemove.startsWith('Renda mínima: ')) {
      setMinIncome(null);
    } else if (filterToRemove.startsWith('Anuidade máxima: ')) {
      setMaxAnnualFee(null);
    } else if (filterToRemove.startsWith('Salas VIP: ')) {
      setHasVipLounge(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ 
      py: 6,
      position: 'relative',
      zIndex: 1
    }}>
      <Box sx={{ 
        mb: 6, 
        textAlign: 'center',
        position: 'relative'
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            mb: 2,
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Cartões de Crédito
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Encontre o cartão de crédito ideal para você
        </Typography>
      </Box>

      <Paper sx={{ 
        mb: 5, 
        p: 3, 
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.5)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Filtros
          </Typography>
          {activeFilters.length > 0 && (
            <Tooltip title="Limpar filtros">
              <IconButton onClick={clearFilters} size="small">
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Buscar cartão ou banco"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 1.5
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          mb: 3
        }}>
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Banco</InputLabel>
              <Select
                value={selectedBank}
                label="Banco"
                onChange={handleBankChange}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 1.5
                }}
              >
                <MenuItem value="">Todos</MenuItem>
                {banks.map(bank => (
                  <MenuItem key={bank} value={bank}>{bank}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={selectedType}
                label="Tipo"
                onChange={handleTypeChange}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 1.5
                }}
              >
                <MenuItem value="">Todos</MenuItem>
                {types.map(type => (
                  <MenuItem key={type || 'default'} value={type || ''}>
                    {type || 'Padrão'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Bandeira</InputLabel>
              <Select
                value={selectedBrand}
                label="Bandeira"
                onChange={handleBrandChange}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 1.5
                }}
              >
                <MenuItem value="">Todas</MenuItem>
                {brands.map(brand => (
                  <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Renda Mínima: {minIncome !== null ? `R$ ${minIncome.toLocaleString()}` : 'Qualquer'}
          </Typography>
          <Slider
            value={minIncome || 0}
            onChange={handleMinIncomeChange}
            min={0}
            max={maxIncome}
            step={1000}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `R$ ${value.toLocaleString()}`}
            sx={{ mt: 1 }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Anuidade Máxima: {maxAnnualFee !== null ? `R$ ${maxAnnualFee.toLocaleString()}` : 'Qualquer'}
          </Typography>
          <Slider
            value={maxAnnualFee || 0}
            onChange={handleMaxAnnualFeeChange}
            min={0}
            max={maxFee}
            step={100}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `R$ ${value.toLocaleString()}`}
            sx={{ mt: 1 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Salas VIP</InputLabel>
            <Select
              value={hasVipLounge === null ? '' : hasVipLounge.toString()}
              label="Salas VIP"
              onChange={handleVipLoungeChange}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 1.5
              }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="true">Com acesso</MenuItem>
              <MenuItem value="false">Sem acesso</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {activeFilters.length > 0 && (
          <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {activeFilters.map((filter, index) => (
              <Chip
                key={index}
                label={filter}
                onDelete={() => removeFilter(filter)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </Paper>

      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          color: 'text.secondary',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        {filteredCards.length} cartões encontrados
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          md: 'repeat(3, 1fr)' 
        },
        gap: 3
      }}>
        {filteredCards.map((card, index) => (
          <Box key={index}>
            <CreditCard card={card} />
          </Box>
        ))}
      </Box>

      <Box 
        component="footer" 
        sx={{ 
          mt: 8, 
          py: 3, 
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          color: 'text.secondary'
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Cartões de Crédito - Todos os direitos reservados
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
