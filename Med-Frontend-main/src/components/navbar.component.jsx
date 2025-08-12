import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Divider, Button,
  Card, CardContent, Box, Tooltip, Switch, Select, FormControl, InputLabel,
  TextField, Grid
} from "@mui/material";
import {
  AccountCircle, ExpandMore as ExpandMoreIcon, Add as AddIcon,
  Delete as DeleteIcon, Language as LanguageIcon
} from "@mui/icons-material";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [medications, setMedications] = useState([]);
  const [schedules, setSchedules] = useState([{ id: 1, exactTime: "" }]);
  const [frequency, setFrequency] = useState("Daily");
  const [medicineName, setMedicineName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchor, setLangAnchor] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLangMenuOpen = (event) => setLangAnchor(event.currentTarget);
  const handleLangMenuClose = () => setLangAnchor(null);

  const handleAddMedication = () => {
    setShowMedicationForm(true);
  };

  const addSchedule = () => {
    setSchedules([...schedules, { id: schedules.length + 1, exactTime: "" }]);
  };

  const removeSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const handleSaveMedication = () => {
    if (!medicineName || !startDate || !endDate) {
      alert("Please enter all required details.");
      return;
    }
    setMedications([...medications, { medicineName, frequency, startDate, endDate, schedules }]);
    setShowMedicationForm(false);
    setMedicineName("");
    setStartDate("");
    setEndDate("");
    setSchedules([{ id: 1, exactTime: "" }]);
  };

  const handleDeleteMedication = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

  return (
    <Box className={darkMode ? "dark-mode" : ""}>
      <AppBar position="static" className={darkMode ? "bg-gray-800" : "bg-blue-500"}>
        <Toolbar>
          <Typography variant="h6" className="flex-grow font-bold">
            💊 MedTrack
          </Typography>

          {/* Language Selector */}
          <IconButton color="inherit" onClick={handleLangMenuOpen}>
            <LanguageIcon />
          </IconButton>
          <Menu anchorEl={langAnchor} open={Boolean(langAnchor)} onClose={handleLangMenuClose}>
            <MenuItem onClick={handleLangMenuClose}>English</MenuItem>
            <MenuItem onClick={handleLangMenuClose}>Telugu</MenuItem>
            <MenuItem onClick={handleLangMenuClose}>Hindi</MenuItem>
          </Menu>

          {/* Dark Mode Toggle */}
          <Switch checked={darkMode} onChange={toggleDarkMode} />

          {/* Profile Section */}
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircle />
            <ExpandMoreIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Change Password</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {!showMedicationForm ? (
        <Box className="main-content">
          <Typography variant="h5" textAlign="center" marginY={3}>Steps for Medicine Tracker</Typography>
          <Card className="p-6 w-96 shadow-lg text-center" sx={{ margin: "auto", padding: 3 }}>
            <CardContent>
              <ul className="text-left list-disc pl-6 mb-4">
                <li>Register your medication</li>
                <li>Set schedule and dosage</li>
                <li>Enable notifications</li>
                <li>Track your intake</li>
              </ul>
              <Button variant="contained" color="primary" onClick={handleAddMedication} startIcon={<AddIcon />}>Add Medication</Button>
            </CardContent>
          </Card>

          {/* Display Saved Medications */}
          {medications.length > 0 && (
            <Box marginTop={4}>
              <Typography variant="h5" textAlign="center">Your Medications</Typography>
              {medications.map((med, index) => (
                <Card key={index} sx={{ margin: "20px auto", padding: 2, width: "50%" }}>
                  <CardContent>
                    <Typography variant="h6">{med.medicineName}</Typography>
                    <Typography>Frequency: {med.frequency}</Typography>
                    <Typography>Start Date: {med.startDate}</Typography>
                    <Typography>End Date: {med.endDate}</Typography>
                    <Typography>Schedules:</Typography>
                    <ul>
                      {med.schedules.map((s, i) => (
                        <li key={i}>{s.exactTime}</li>
                      ))}
                    </ul>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteMedication(index)}>Delete</Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Card className="medication-form" sx={{ width: "40%", padding: 3 }}>
            <CardContent>
              <Typography variant="h5" textAlign="center">Add Medication Details</Typography>
              
              <TextField fullWidth label="Medicine Name" margin="normal" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Frequency</InputLabel>
                <Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                  <MenuItem value="Daily">Every Day</MenuItem>
                  <MenuItem value="Alternate">Alternate Days</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>

              <TextField fullWidth label="Start Date" type="date" margin="normal" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <TextField fullWidth label="End Date" type="date" margin="normal" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />

              {schedules.map((schedule) => (
                <Box key={schedule.id} display="flex" alignItems="center" marginBottom={2}>
                  <TextField label="Exact Time" type="time" value={schedule.exactTime} onChange={(e) => {
                    const updatedSchedules = schedules.map(s => s.id === schedule.id ? { ...s, exactTime: e.target.value } : s);
                    setSchedules(updatedSchedules);
                  }} fullWidth />
                  <IconButton onClick={() => removeSchedule(schedule.id)}><DeleteIcon /></IconButton>
                </Box>
              ))}

              <Button variant="outlined" fullWidth onClick={addSchedule} sx={{ marginTop: 2 }}>Add Another Schedule</Button>
              <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleSaveMedication}>Save</Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;