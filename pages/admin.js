import React from "react";
import styles from "../styles/table.module.css";
import { fireAuth, firestore } from "../services/firebase";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  makeStyles,
  Paper,
  Link,
  Grid,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AppsIcon from "@mui/icons-material/Apps";
import ArchiveIcon from "@mui/icons-material/Archive";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { handleUpdate } from "../services/firebase";
import { deleteUser } from "firebase/auth";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: 10,
  },
}));

const table = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [cpu, setCpu] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [memory, setMemory] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [handdisk, setHanddisk] = React.useState("");
  const [store, setStore] = React.useState("");
  const [imageTitle, setImageTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [operating, setOperating] = React.useState("");
  const [graphics, setGraphics] = React.useState("");
  const [display, setDisplay] = React.useState("");
  const [battery, setBattery] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [type, setType] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [nameu, setNameu] = React.useState("");
  const [cpuu, setCpuu] = React.useState("");
  const [priceu, setPriceu] = React.useState("");
  const [memoryu, setMemoryu] = React.useState("");
  const [urlu, setUrlu] = React.useState("");
  const [handdisku, setHanddisku] = React.useState("");
  const [storeu, setStoreu] = React.useState("");
  const [imageTitleu, setImageTitleu] = React.useState("");
  const [descriptionu, setDescriptionu] = React.useState("");
  const [operatingu, setOperatingu] = React.useState("");
  const [graphicsu, setGraphicsu] = React.useState("");
  const [displayu, setDisplayu] = React.useState("");
  const [batteryu, setBatteryu] = React.useState("");
  const [weightu, setWeightu] = React.useState("");
  const [typeu, setTypeu] = React.useState("");
  const [namee, setNamee] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router=useRouter();
  React.useEffect(() => {
    let userInfo = [];
    firestore
      .collection("User")
      .get()
      .then((res) => {
        res.forEach((action) => {
          userInfo.push({ ...action.data(), ProductID: action.id });
        });
        setData(userInfo);
      });
  }, []);
  const [currentUser, setCurrentUser] = React.useState([]);
  React.useEffect(() => {
    firestore.collection("Users").onSnapshot((snapshot) => {
      let currentUser = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      currentUser.forEach(function (item, index, array) {});
      setCurrentUser(currentUser);
    });
  }, []);
  const handleDelet = (ProductID) => {
    firestore
      .collection("User")
      .doc(ProductID)
      .delete()
      .then((result) => {
        console.log("Delet Successfull");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = () => {
    firestore
      .collection("User")
      .doc(productId)
      .update({
        url: urlu,
        name: nameu,
        cpu: cpuu,
        handdisk: handdisku,
        store: storeu,
        type: typeu,
        imageTitle: imageTitleu,
        price: priceu,
        description: descriptionu,
        operating: operatingu,
        memory: memoryu,
        graphics: graphicsu,
        display: displayu,
        battery: batteryu,
        weight: weightu,
      })
      .then((res) => {
        setOpen(false);
        setUrl("");
        setName("");
        setCpu("");
        setHanddisk("");
        setStore("");
        setType("");
        setImageTitle("");
        setPrice("");
        setDescription("");
        setOperating("");
        setMemory("");
        setGraphics("");
        setDisplay("");
        setBattery("");
        setWeight("");
        alert("Update Successfull");
      })
      .catch((err) => {
        console.log(err);
        setUrl("");
        setName("");
        setCpu("");
        setHanddisk("");
        setStore("");
        setType("");
        setImageTitle("");
        setPrice("");
        setDescription("");
        setOperating("");
        setMemory("");
        setGraphics("");
        setDisplay("");
        setBattery("");
        setWeight("");
      });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    firestore
      .collection("User")
      .add({
        url: url,
        name: name,
        cpu: cpu,
        handdisk: handdisk,
        store: store,
        type: type,
        imageTitle: imageTitle,
        price: price,
        description: description,
        operating: operating,
        memory: memory,
        graphics: graphics,
        display: display,
        battery: battery,
        weight: weight,
      })
      .then((res) => {
        alert("Successfull");
        setUrl("");
        setName("");
        setCpu("");
        setHanddisk("");
        setStore("");
        setType("");
        setImageTitle("");
        setPrice("");
        setDescription("");
        setOperating("");
        setMemory("");
        setGraphics("");
        setDisplay("");
        setBattery("");
        setWeight("");
      })
      .catch((err) => {
        console.log(err);
        setUrl("");
        setName("");
        setCpu("");
        setHanddisk("");
        setStore("");
        setType("");
        setImageTitle("");
        setPrice("");
        setDescription("");
        setOperating("");
        setMemory("");
        setGraphics("");
        setDisplay("");
        setBattery("");
        setWeight("");
      });
  };
  //const handleUpdate = (e) => {
  //  e.preventDefault();
  //const { cpu, name, price, memory } = e.target.elements;
  //firestore.collection('User').doc(id).update({ cpu: cpu.value, name: name.value, price: price.value, memory: memory.value })
  //  .then((res) => {
  //  console.log('Update Successfull')
  //})
  //.catch((err) => {
  //  console.log(err)
  //})
  //}
  const handleRemove = (id) => {
    firestore
      .collection("Users")
      .doc(id)
      .delete()

      .then((res) => {
        console.log("delete Successfull");
      })
      .catch((err) => {
        console.log(err);
      });
    
    // if(user!==null){
    //   const user = fireAuth.currentUser;
    //   deleteUser(user)
    //   .then((res) => {
    //     console.log("Delete user successfull");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateClick = (action) => {
    setNameu(action.name);
    setBatteryu(action.battery);
    setCpuu(action.cpu);
    setGraphicsu(action.graphics);
    setDescriptionu(action.description);
    setDisplayu(action.display);
    setMemoryu(action.memory);
    setImageTitleu(action.imageTitle);
    setPriceu(action.price);
    setWeightu(action.weight);
    setOperatingu(action.operating);
    setTypeu(action.type);
    setStoreu(action.store);
    setHanddisku(action.handdisk);
    setUrlu(action.url);
    setProductId(action.ProductID);
  };
  // for update user
  const handleUpdateUser = () => {
    firestore
      .collection("CurrentUser")
      .doc(userId)
      .update({
        name: namee,
        email: email,
        password: password,
      })
      .then((res) => {
        alert("Update User Successfull !");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //get data form firebase
  const handleUpdateuClick = (item) => {
    setNamee(item.name);
    setEmail(item.email);
    setPassword(item.password);
    setUserId(item.id);
  };
  const [value, setValue] = React.useState(1);
  const classes = useStyles();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Admin Page
            </Typography>
            <Button style={{position:'absolute',right:20}} onClick={()=>{
              fireAuth.signOut()
              router.push('/')
              }}>LoyOut</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid justifyContent="center" container spacing={1}>
        <Grid item xs={2}>
          <Button
            startIcon={<AppsIcon />}
            variant="outlined"
            fullWidth
            style={{ marginTop: 10 }}
            onClick={() => setValue(1)}
          >
            Products
          </Button>
          <Button
            onClick={() => setValue(2)}
            startIcon={<AccountCircleIcon />}
            variant="outlined"
            fullWidth
            style={{ marginTop: 5 }}
          >
            User
          </Button>
          <Button
            onClick={() => setValue(5)}
            startIcon={<AddIcon />}
            variant="outlined"
            fullWidth
            style={{ marginTop: 10 }}
          >
            Add New Products
          </Button>
        </Grid>
        {value === 1 && (
          <Grid item xs={10}>
            <div>
              <Dialog open={open} onClose={handleClose}>
                <Link
                  onClick={handleClose}
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textAlign: "right",
                    marginTop: 20,
                    marginRight: 15,
                  }}
                >
                  <CloseIcon />
                </Link>
                <DialogContent>
                  <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                      <Grid>
                        <form>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <FormControl fullWidth>
                                <InputLabel
                                  variant="standard"
                                  htmlFor="uncontrolled-native"
                                >
                                  Type of Computer
                                </InputLabel>
                                <NativeSelect
                                  native
                                  value={typeu}
                                  onChange={(e) => setTypeu(e.target.value)}
                                  inputProps={{
                                    name: "type",
                                    id: "uncontrolled-native",
                                  }}
                                >
                                  <option value=""></option>
                                  <option value={0}>Laptop</option>
                                  <option value={1}>2-In-1Laptops</option>
                                  <option value={2}>Gaming Laptops</option>
                                  <option value={3}>Macbooks</option>
                                  <option value={4}>Surfaces</option>
                                  <option value={5}>Tablets</option>
                                  <option value={6}>Brands PC</option>
                                  <option value={7}>Brands Gaming PC</option>
                                  <option value={8}>Custom PC</option>
                                  <option value={9}>Custom Gaming PC</option>
                                  <option value={10}>All-in-One</option>
                                  <option value={11}>iMac, iMac Pro</option>
                                  <option value={12}>Workstations</option>
                                  <option value={13}>HOT SALE</option>
                                  <option value={14}>NEW ARRIVAL</option>
                                  <option value={15}>COMING SOON</option>
                                </NativeSelect>
                              </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={urlu}
                                onChange={(e) => setUrlu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="url"
                                label="Inputer the URL"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={nameu}
                                onChange={(e) => setNameu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="name"
                                label="Enter the Name"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={cpuu}
                                onChange={(e) => setCpuu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="cpu"
                                label="Enter the CPU"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={handdisku}
                                onChange={(e) => setHanddisku(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="hd"
                                label="Enter the Hand Disk"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={storeu}
                                onChange={(e) => setStoreu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="st"
                                label="Enter the Store"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={imageTitleu}
                                onChange={(e) => setImageTitleu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="imti"
                                label="Enter the Title Image"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={priceu}
                                onChange={(e) => setPriceu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="pb"
                                label="Enter the PriceProduct"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={descriptionu}
                                onChange={(e) =>
                                  setDescriptionu(e.target.value)
                                }
                                type="text"
                                variant="outlined"
                                name="description"
                                label="Enter the description"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={operatingu}
                                onChange={(e) => setOperatingu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="operating"
                                label="Enter the operating"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={memoryu}
                                onChange={(e) => setMemoryu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="memory"
                                label="Enter the memory"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={graphicsu}
                                onChange={(e) => setGraphicsu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="graphics"
                                label="Enter the graphics"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={displayu}
                                onChange={(e) => setDisplayu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="display"
                                label="Enter the display"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={typeu}
                                onChange={(e) => setTypeu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="typeu"
                                label="Enter the Type "
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={batteryu}
                                onChange={(e) => setBatteryu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="battery"
                                label="Enter the battery"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className={classes.input}
                                value={weightu}
                                onChange={(e) => setWeightu(e.target.value)}
                                type="text"
                                variant="outlined"
                                name="weight"
                                label="Enter the weight"
                                fullWidth
                              ></TextField>
                            </Grid>
                            <Button
                              className={classes.input}
                              onClick={() => handleUpdate()}
                              variant="outlined"
                              fullWidth
                            >
                              Update
                            </Button>
                          </Grid>
                        </form>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>
              <table className={styles.table}>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Type</th>
                  <th scope="col">Price</th>
                  <th scope="col">Button</th>
                </tr>
              </table>
              {data.map((action, index) => {
                return (
                  <div key={action.id}>
                    <table className={styles.table}>
                      <tr>
                        <td>
                          <img
                            src={action.url}
                            width="100px"
                            height="100px"
                          ></img>
                        </td>
                        <td>{action.description}</td>
                        <td>{action.type}</td>
                        <td>{action.price}</td>
                        <td>
                          <IconButton
                            onClick={() => handleDelet(action.ProductID)}
                            style={{ color: "red" }}
                            title="Delete Product"
                          >
                            <DeleteIcon />
                          </IconButton>{" "}
                          <IconButton
                            onClick={() => {
                              handleOpen(action);
                              handleUpdateClick(action);
                            }}
                            style={{ color: "blue" }}
                            title="Edit Product"
                          >
                            <EditIcon />
                          </IconButton>
                        </td>
                      </tr>
                    </table>
                  </div>
                );
              })}
            </div>
          </Grid>
        )}
        {value === 2 && (
          <Grid item xs={10}>
            <div>
              <table className={styles.table}>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Button</th>
                </tr>
              </table>
              <Dialog open={open} onClose={handleClose}>
                <Link
                  onClick={handleClose}
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textAlign: "right",
                    marginTop: 20,
                    marginRight: 15,
                  }}
                >
                  <CloseIcon />
                </Link>
                <DialogContent>
                  <form>
                    <TextField
                      type="text"
                      variant="outlined"
                      value={namee}
                      onChange={(e) => setNamee(e.target.value)}
                      style={{ marginTop: 5 }}
                      placeholder="Enter the New Name"
                      fullWidth
                    ></TextField>
                    <TextField
                      type="text"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ marginTop: 5 }}
                      placeholder="Enter the New Email"
                      fullWidth
                    ></TextField>
                    <Button
                      variant="outlined"
                      onClick={handleUpdateUser}
                      style={{ marginTop: 5 }}
                      fullWidth
                    >
                      Update User
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              {currentUser.map((item, index) => {
                return (
                  <table className={styles.table}>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <IconButton
                          onClick={() => handleRemove(item.id)}
                          style={{ color: "red" }}
                        >
                          <DeleteIcon />
                        </IconButton>{" "}
                        <IconButton
                          style={{ color: "blue" }}
                          onClick={() => {
                            handleOpen(item);
                            handleUpdateuClick(item);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </td>
                    </tr>
                  </table>
                );
              })}
            </div>
          </Grid>
        )}
        {value === 5 && (
          <Grid item xs={10}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Grid>
                  <form onSubmit={handleUpload}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel
                            variant="standard"
                            htmlFor="uncontrolled-native"
                          >
                            Type of Computer
                          </InputLabel>
                          <NativeSelect
                            native
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            inputProps={{
                              name: "type",
                              id: "uncontrolled-native",
                            }}
                          >
                            <option value=""></option>
                            <option value={0}>Laptop</option>
                            <option value={1}>2-In-1Laptops</option>
                            <option value={2}>Gaming Laptops</option>
                            <option value={3}>Macbooks</option>
                            <option value={4}>Surfaces</option>
                            <option value={5}>Tablets</option>
                            <option value={6}>Brands PC</option>
                            <option value={7}>Brands Gaming PC</option>
                            <option value={8}>Custom PC</option>
                            <option value={9}>Custom Gaming PC</option>
                            <option value={10}>All-in-One</option>
                            <option value={11}>iMac, iMac Pro</option>
                            <option value={12}>Workstations</option>
                            <option value={13}>HOT SALE</option>
                            <option value={14}>NEW ARRIVAL</option>
                            <option value={15}>COMING SOON</option>
                          </NativeSelect>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="url"
                          label="Inputer the URL"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="name"
                          label="Enter the Name"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={cpu}
                          onChange={(e) => setCpu(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="cpu"
                          label="Enter the CPU"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={handdisk}
                          onChange={(e) => setHanddisk(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="hd"
                          label="Enter the Hand Disk"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={store}
                          onChange={(e) => setStore(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="st"
                          label="Enter the Store"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={imageTitle}
                          onChange={(e) => setImageTitle(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="imti"
                          label="Enter the Title Image"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="pb"
                          label="Enter the PriceProduct"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="description"
                          label="Enter the description"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={operating}
                          onChange={(e) => setOperating(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="operating"
                          label="Enter the operating"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={memory}
                          onChange={(e) => setMemory(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="memory"
                          label="Enter the memory"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={graphics}
                          onChange={(e) => setGraphics(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="graphics"
                          label="Enter the graphics"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={display}
                          onChange={(e) => setDisplay(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="display"
                          label="Enter the display"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={battery}
                          onChange={(e) => setBattery(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="battery"
                          label="Enter the battery"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          className={classes.input}
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          type="text"
                          variant="outlined"
                          name="weight"
                          label="Enter the weight"
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Button
                        className={classes.input}
                        onClick={handleUpload}
                        variant="outlined"
                        fullWidth
                      >
                        Add New Products
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default table;
