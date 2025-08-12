import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Switch,
  TextField,
} from "@mui/material";
import {
  AccountCircle,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [medications, setMedications] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [medicineDetails, setMedicineDetails] = useState({
    medicineName: "",
    frequency: "Daily",
    startDate: "",
    endDate: "",
    schedules: [{ id: 1, exactTime: "" }],
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState(""); // State to store the user's name

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  // Fetch user's name and medications when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");

      try {
        // Fetch user's name
        const userResponse = await fetch(
          `https://med-backend-75az.onrender.com/user/${userId}`
        );
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserName(userData.fullname); // Set the user's name
        } else {
          console.error("Failed to fetch user data");
        }

        // Fetch medications
        const medicationResponse = await fetch(
          `https://med-backend-75az.onrender.com/medications/${userId}`
        );
        if (medicationResponse.ok) {
          const medicationData = await medicationResponse.json();
          setMedications(medicationData);
        } else {
          console.error("Failed to fetch medications");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleAddMedication = () => {
    setShowMedicationForm(true);
    setEditingIndex(null);
    setMedicineDetails({
      medicineName: "",
      frequency: "Daily",
      startDate: "",
      endDate: "",
      schedules: [{ id: 1, exactTime: "" }],
    });
  };

  const handleDeleteMedication = async (index) => {
    const medicationId = medications[index].id;

    try {
      const response = await fetch(
        `https://med-backend-75az.onrender.com/medications/${medicationId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the medication from the state
        const updatedMedications = medications.filter((_, i) => i !== index);
        setMedications(updatedMedications);
      } else {
        console.error("Failed to delete medication");
      }
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const addSchedule = () => {
    setMedicineDetails({
      ...medicineDetails,
      schedules: [
        ...medicineDetails.schedules,
        { id: medicineDetails.schedules.length + 1, exactTime: "" },
      ],
    });
  };

  const removeSchedule = (id) => {
    setMedicineDetails({
      ...medicineDetails,
      schedules: medicineDetails.schedules.filter(
        (schedule) => schedule.id !== id
      ),
    });
  };

  const handleSaveMedication = async () => {
    const userId = localStorage.getItem("userId");

    const medicationData = {
      userId,
      name: medicineDetails.medicineName,
      frequency: medicineDetails.frequency,
      startDate: medicineDetails.startDate,
      endDate: medicineDetails.endDate,
      schedules: medicineDetails.schedules,
    };

    try {
      const url =
        editingIndex !== null
          ? `https://med-backend-75az.onrender.com/medications/${medications[editingIndex].id}`
          : "https://med-backend-75az.onrender.com/medications";

      const method = editingIndex !== null ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicationData),
      });

      if (response.ok) {
        setShowMedicationForm(false);
        // Fetch updated medications
        const updatedResponse = await fetch(
          `https://med-backend-75az.onrender.com/medications/${userId}`
        );
        if (updatedResponse.ok) {
          const data = await updatedResponse.json();
          setMedications(data);
        }
      } else {
        console.error("Failed to save medication");
      }
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };

  const handleEditMedication = (index) => {
    const medication = medications[index];
    setEditingIndex(index);
    setMedicineDetails({
      medicineName: medication.name,
      frequency: medication.frequency,
      startDate: medication.start_date,
      endDate: medication.end_date,
      schedules: medication.schedules.map((schedule) => ({
        id: schedule.id,
        exactTime: schedule.exact_time,
      })),
    });
    setShowMedicationForm(true);
  };

  const handleEmergencyCall = async () => {
    const userId = localStorage.getItem("userId"); // Get the logged-in user's ID

    try {
      // Fetch the family doctor's number from the backend
      const response = await fetch(
        `https://med-backend-75az.onrender.com/userem/${userId}`
      );

      if (response.ok) {
        const userData = await response.json();
        const familyDoctorNumber = userData.familyDoctorNumber;

        if (familyDoctorNumber) {
          // Initiate the call
          window.location.href = `tel:${familyDoctorNumber}`;
        } else {
          alert("Family doctor's number is not available.");
        }
      } else {
        alert("Failed to fetch family doctor's number.");
      }
    } catch (error) {
      console.error("Error fetching family doctor's number:", error);
      alert("An error occurred while fetching family doctor's number.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // If stored in sessionStorage, replace with sessionStorage.removeItem("token")
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <Box className={darkMode ? "dark-mode" : ""} sx={{ padding: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            💊 MedTrack
          </Typography>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ mr: 2 }}>
              {userName} {/* Display the user's name */}
            </Typography>
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle />
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              Change Password
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box textAlign="center" mt={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEmergencyCall}
          sx={{ mt: 2 }}
        >
          Emergency Call
        </Button>
      </Box>
      {!showMedicationForm ? (
        <Box textAlign="center" mt={3}>
          <Typography variant="h5">Manage Your Medications</Typography>
          <Button
            variant="contained"
            onClick={handleAddMedication}
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
          >
            Add Medication
          </Button>
          <Grid container spacing={2} justifyContent="center" mt={3}>
            {medications.map((med, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ padding: 2, textAlign: "left" }}>
                  <CardContent>
                    <Typography variant="h6">{med.name}</Typography>
                    <Typography>Frequency: {med.frequency}</Typography>
                    <Typography>Start Date: {med.start_date}</Typography>
                    <Typography>End Date: {med.end_date}</Typography>
                    <Typography>
                      Times: {med.schedules.map((s) => s.exact_time).join(", ")}
                    </Typography>
                    <Button
                      onClick={() => handleEditMedication(index)}
                      startIcon={<EditIcon />}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteMedication(index)}
                      startIcon={<DeleteIcon />}
                      color="error"
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Card sx={{ width: "90%", maxWidth: "500px", padding: 3 }}>
            <CardContent>
              <Typography variant="h5" textAlign="center">
                {editingIndex !== null ? "Edit" : "Add"} Medication
              </Typography>
              <TextField
                fullWidth
                label="Medicine Name"
                margin="normal"
                value={medicineDetails.medicineName}
                onChange={(e) =>
                  setMedicineDetails({
                    ...medicineDetails,
                    medicineName: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                margin="normal"
                value={medicineDetails.startDate}
                onChange={(e) =>
                  setMedicineDetails({
                    ...medicineDetails,
                    startDate: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                margin="normal"
                value={medicineDetails.endDate}
                onChange={(e) =>
                  setMedicineDetails({
                    ...medicineDetails,
                    endDate: e.target.value,
                  })
                }
              />
              {medicineDetails.schedules.map((schedule) => (
                <Box
                  key={schedule.id}
                  display="flex"
                  alignItems="center"
                  marginBottom={2}
                >
                  <TextField
                    label="Exact Time"
                    type="time"
                    fullWidth
                    value={schedule.exactTime}
                    onChange={(e) => {
                      const updatedSchedules = medicineDetails.schedules.map(
                        (s) =>
                          s.id === schedule.id
                            ? { ...s, exactTime: e.target.value }
                            : s
                      );
                      setMedicineDetails({
                        ...medicineDetails,
                        schedules: updatedSchedules,
                      });
                    }}
                  />
                  <IconButton onClick={() => removeSchedule(schedule.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={addSchedule}>Add Schedule</Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSaveMedication}
              >
                Save
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
