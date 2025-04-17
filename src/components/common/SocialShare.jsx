import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  Facebook,
  Twitter,
  WhatsApp,
  Pinterest,
  ContentCopy
} from '@mui/icons-material';
import { useToast } from '../hooks/useToast';

const SocialShare = ({ url, title, image }) => {
  const { showToast } = useToast();

  const shareData = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(title)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy link', 'error');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Tooltip title="Share on Facebook">
        <IconButton onClick={() => window.open(shareData.facebook, '_blank')}>
          <Facebook />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Twitter">
        <IconButton onClick={() => window.open(shareData.twitter, '_blank')}>
          <Twitter />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on WhatsApp">
        <IconButton onClick={() => window.open(shareData.whatsapp, '_blank')}>
          <WhatsApp />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Pinterest">
        <IconButton onClick={() => window.open(shareData.pinterest, '_blank')}>
          <Pinterest />
        </IconButton>
      </Tooltip>
      <Tooltip title="Copy Link">
        <IconButton onClick={copyToClipboard}>
          <ContentCopy />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SocialShare;