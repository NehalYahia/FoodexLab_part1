import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {DataProvider} from "./DataContext";
import Home from './controlPanal/Pages/Home';
import ProtectedRoute from './ShareComponent/ProtectedRoute';
import SignInsignUp from './controlPanal/Pages/signInsignUp';
import WHome from '../src/website/pages/WHome';
import WaddSample from './website/pages/WaddSample';
import AllSamples from './controlPanal/Pages/AllSamples';
import MethodPageWIthoutConfirmation from './controlPanal/Pages/MethodPageWIthoutConfirmation';
import MethodPageWIthConfirmation from './controlPanal/Pages/MethodPageWIthConfirmation';
import MethodPageDetection from './controlPanal/Pages/MethodPageDetection';
import RequestedTestPage from './controlPanal/Pages/RequestedTestPage';
import AddSampleNewClient from './controlPanal/Pages/Microbiology/AddSampleNewClient';
import AddSampleOldClient from './controlPanal/Pages/Microbiology/AddSampleOldClient';
import AddCh_TestsForNewClient from './controlPanal/Pages/Chemistry/AddCh_TestsForNewClient';
import AddCh_TestsForOldClient from './controlPanal/Pages/Chemistry/AddCh_TestsForOldClient';
import NewRequestedTest from './controlPanal/Pages/NewRequestedTest';
import AllRequestedTests from './controlPanal/Pages/AllRequestedTests';
import AddLabUser from './controlPanal/Pages/AddLabUser';
import Certifecate from './controlPanal/Pages/certificate';
import UpdateSample from './controlPanal/Pages/UpdateSample';
import ReviewSample from './controlPanal/Pages/ReviewSample';

import UpdateRequestedTests from './controlPanal/Pages/UpdateRequestedTestPage';

function App() {
    return (
        <DataProvider>
      <Router>
          <Routes>
                    <Route path="/login&sign" element={<SignInsignUp />} />
                    <Route path="/login&sign/client" element={<SignInsignUp />} />
              <Route
                  path="/home"
                  element={
                      <ProtectedRoute>
                          <Home />
                      </ProtectedRoute>
                  }
                    />
                  
                    <Route
                        path="/"
                        element={
                                <WHome />
                        }
                    />

                    {/*<Route*/}
                    {/*    path="/addSample"*/}
                    {/*    element={*/}
                    {/*        <ProtectedRoute>*/}
                    {/*            <WaddSample />*/}
                    {/*        </ProtectedRoute>*/}
                    {/*    }*/}
                    {/*/>*/}

                    <Route
                        path="/addAllSamples"
                        element={
                            <ProtectedRoute>
                                <AllSamples/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/Sample/without/:id"
                        element={
                            <ProtectedRoute>
                                <MethodPageWIthoutConfirmation />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/Sample/detection/:id/:sampleid/:req"
                        element={
                            <ProtectedRoute>
                                <MethodPageDetection />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/Sample/:id"
                        element={
                            <ProtectedRoute>
                                <MethodPageWIthConfirmation />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/Test/:id"
                        element={
                            <ProtectedRoute>
                                <RequestedTestPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/addSample/newClient"
                        element={
                            <ProtectedRoute>
                                <AddSampleNewClient />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/addSample/oldClient"
                        element={
                            <ProtectedRoute>
                                <AddSampleOldClient />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/addSample/Ch/newClient"
                        element={
                            <ProtectedRoute>
                                <AddCh_TestsForNewClient />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/addSample/Ch/oldClient"
                        element={
                            <ProtectedRoute>
                                <AddCh_TestsForOldClient />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/addRequestedTest"
                        element={
                            <ProtectedRoute>
                                <NewRequestedTest />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/allRequestedTest"
                        element={
                            <ProtectedRoute>
                                <AllRequestedTests />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/updateRequestedTest/:id"
                        element={
                            <ProtectedRoute>
                                <UpdateRequestedTests />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/addNewUser"
                        element={
                            <ProtectedRoute>
                                <AddLabUser />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/Certifecate/:id"
                        element={
                            <ProtectedRoute>
                                <Certifecate />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/UpdateSample/:id"
                        element={
                            <ProtectedRoute>
                                <UpdateSample />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/ReviewSample/:id"
                        element={
                            <ProtectedRoute>
                                <ReviewSample />
                            </ProtectedRoute>
                        }
                    />
              {/*<Route path="/Home" element={<Home />} />*/}
          </Routes>
            </Router>
        </DataProvider>
  );
}

export default App;
