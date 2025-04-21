import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { CreditCard as CreditCardType } from '../types/CreditCard';
import { formatCurrency } from '../utils/formatters';
import '../styles/CreditCard.css';

interface CreditCardProps {
  card: CreditCardType;
}

const getCardTypeClass = (type: string | null): string => {
  switch (type) {
    case 'Black':
      return 'card-black';
    case 'Platinum+':
      return 'card-platinum-plus';
    case 'Platinum':
      return 'card-platinum';
    case 'Gold':
      return 'card-gold';
    default:
      return 'card-default';
  }
};

export const CreditCard = ({ card }: CreditCardProps) => {
  const cardTypeClass = getCardTypeClass(card.card_type);

  return (
    <Card className={`credit-card ${cardTypeClass}`}>
      <CardContent className="credit-card-content">
        <Box className="credit-card-header">
          <Typography 
            variant="h6" 
            component="div" 
            className="credit-card-title"
          >
            {card.card_name}
          </Typography>
          <Typography className="credit-card-bank">
            {card.bank_name}
          </Typography>
          
          <Box className="credit-card-chips">
            <Chip 
              label={card.card_brand} 
              className="credit-card-chip"
            />
            {card.card_type && (
              <Chip 
                label={card.card_type} 
                className="credit-card-chip"
              />
            )}
          </Box>
        </Box>

        <Box className="credit-card-details">
          <Typography variant="body2">
            <strong>Anuidade:</strong> {card.annual_fee ? formatCurrency(card.annual_fee) : 'Grátis'}
          </Typography>

          {card.annual_fee_exemption_expenses && (
            <Typography variant="body2">
              <strong>Isenção por gastos:</strong> {formatCurrency(card.annual_fee_exemption_expenses)}
            </Typography>
          )}

          {card.points_per_usd && (
            <Typography variant="body2">
              <strong>Pontos por USD:</strong> {card.points_per_usd}
            </Typography>
          )}

          {card.vip_lounge && (
            <Typography variant="body2">
              <strong>Salas VIP:</strong> {card.vip_lounge}
            </Typography>
          )}

          {card.minimum_income && (
            <Typography variant="body2">
              <strong>Renda mínima:</strong> {formatCurrency(card.minimum_income)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}; 