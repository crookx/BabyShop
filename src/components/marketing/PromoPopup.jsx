import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import EventTracker from '../../services/analytics/EventTracker';

const PromoPopup = ({ promo }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenPromo = localStorage.getItem(`promo_${promo.id}`);
    const timeoutId = setTimeout(() => {
      if (!hasSeenPromo) {
        setOpen(true);
        EventTracker.trackEvent('promo_shown', { promoId: promo.id });
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [promo.id]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(`promo_${promo.id}`, 'true');
    EventTracker.trackEvent('promo_closed', { promoId: promo.id });
  };

  const handleClaim = () => {
    navigator.clipboard.writeText(promo.code);
    EventTracker.trackEvent('promo_claimed', { promoId: promo.id });
    handleClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 }
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>

          <DialogContent sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h5" gutterBottom>
              {promo.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {promo.description}
            </Typography>
            
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="h6">{promo.code}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleClaim}
            >
              Claim Offer
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;