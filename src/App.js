import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  ToggleButton,
  TextField,
  Autocomplete,
  Slider,
  Stack,
  Grid,
  Divider,
  useMediaQuery
} from '@mui/material';
import { FiArrowLeft, FiEdit3 } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const contentOptions = {
  Fun: [
    'Board games revival',
    'Comedy trends',
    'Amusement parks',
    'Escape rooms',
    'Street performances',
    'Online challenges',
    'Festivals impact',
    'Crafting movement',
    'Social gaming',
    'Virtual reality'
  ],
  Education: [
    'Gamified learning',
    'Education systems',
    'Bilingual benefits',
    'Standardized testing',
    'Arts in schools',
    'Tech bootcamps',
    'Homeschooling dynamics',
    'Mentorship importance',
    'Educational equity',
    'Mobile learning'
  ],
  Sports: [
    'Sports medicine',
    'Team sociology',
    'Olympic economics',
    'Gender parity'
  ],
  News: [
    'Citizen journalism',
    'Whistleblower influence',
    'Fake news',
    'Print media survival'
  ],
  Investment: [
    'Robo-advising',
    'Geopolitical impacts',
    'Index funds',
    'Real estate trends'
  ],
  Facts: [
    'Animal oddities',
    'Everyday science',
    'Historical obscurities'
  ]
};

const ContentTypeUI = () => {
  const [contentType, setContentType] = useState('Fun');
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [customTitle, setCustomTitle] = useState('');
  const [wordCount, setWordCount] = useState(700);

  const isLargeScreen = useMediaQuery('(min-width:880px)');

  const handleTitleChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setSelectedTitle(null);
      setCustomTitle(newValue);
    } else if (newValue && newValue.inputValue) {
      setSelectedTitle(null);
      setCustomTitle(newValue.inputValue);
    } else {
      setSelectedTitle(newValue);
      setCustomTitle('');
    }
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'string') return option;
    if (option.inputValue) return option.inputValue;
    return option.title;
  };

  const filterOptions = (options, params) => {
    const filtered = options.filter((opt) =>
      opt.toLowerCase().includes(params.inputValue.toLowerCase())
    );

    if (
      params.inputValue !== '' &&
      !options.some((opt) => opt.toLowerCase() === params.inputValue.toLowerCase())
    ) {
      filtered.push({ inputValue: params.inputValue, title: `Add "${params.inputValue}"` });
    }

    return filtered;
  };

  return (
    <Box
      sx={{
        backgroundColor: '#0f0f1b',
        color: '#fff',
        minHeight: '100vh',
        padding: 4,
        maxWidth: 900,
        margin: 'auto',
        borderRadius: 3,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        mb={2}
        gap={2}
      >
        <Box display="flex" flexDirection="column" gap={0.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <FiArrowLeft style={{ cursor: 'pointer' }} />
            <Typography variant="subtitle2" color="gray">
              Media management
            </Typography>
            <FiEdit3 size={14} color="gray" />
          </Box>
          <Typography variant="body2">Draft campaign</Typography>
        </Box>

        {isLargeScreen ? (
          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={0.5}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2">Usman</Typography>
              <FaUserCircle size={24} />
            </Box>
            <Typography variant="caption" sx={{ color: '#7a55fc', cursor: 'pointer' }}>
              Change profile
            </Typography>
          </Box>
        ) : (
          <FaUserCircle size={24} />
        )}
      </Box>

      <Divider sx={{ borderColor: '#333', mb: 3 }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Content type
      </Typography>
      <Typography variant="body2" color="gray" gutterBottom>
        Choose a content type that best fits your needs.
      </Typography>

      <Box>
        <Typography variant="subtitle2" mt={2} mb={1}>
          What type of content are you creating?
        </Typography>

        <Grid container spacing={1} mb={3}>
          {Object.keys(contentOptions).map((type) => (
            <Grid item xs={4} key={type}>
              <ToggleButton
                value={type}
                selected={contentType === type}
                onChange={() => {
                  setContentType(type);
                  setSelectedTitle(null);
                  setCustomTitle('');
                }}
                fullWidth
                sx={{
                  border: '1px solid #333',
                  color: '#fff',
                  borderRadius: '50px',
                  textTransform: 'capitalize',
                  '&.Mui-selected': {
                    backgroundColor: '#7a55fc',
                  },
                }}
              >
                {type}
              </ToggleButton>
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle2" gutterBottom>
          Which type of "{contentType}" content do you want to create?
        </Typography>

        <Autocomplete
          value={selectedTitle || customTitle}
          onChange={handleTitleChange}
          filterOptions={(options, params) =>
            filterOptions(contentOptions[contentType] || [], params)
          }
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          freeSolo
          options={contentOptions[contentType] || []}
          getOptionLabel={getOptionLabel}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              sx={{ input: { color: '#fff' }, label: { color: 'gray' }, mb: 3 }}
            />
          )}
        />

        <Typography variant="subtitle2" gutterBottom>
          Set the number of words for output text.
        </Typography>
        <Slider
          value={wordCount}
          onChange={(e, newValue) => setWordCount(newValue)}
          step={50}
          min={100}
          max={1000}
          sx={{ color: '#7a55fc', mb: 2 }}
          valueLabelDisplay="on"
        />

        {isLargeScreen ? (
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              sx={{
                backgroundColor: '#1c1c2e',
                color: '#fff',
                borderRadius: 5,
                px: 4
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#7a55fc',
                color: '#fff',
                borderRadius: 5,
                px: 4
              }}
            >
              Next
            </Button>
          </Box>
        ) : (
          <Stack spacing={2} mt={3}>
            <Button
              fullWidth
              sx={{
                backgroundColor: '#1c1c2e',
                color: '#fff',
                borderRadius: 5,
              }}
            >
              Back
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#7a55fc',
                color: '#fff',
                borderRadius: 5,
              }}
            >
              Next
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default ContentTypeUI;
