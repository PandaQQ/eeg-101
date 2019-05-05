package com.eeg_project.components.meditation_focus_classifier;

import android.os.Handler;

import com.choosemuse.libmuse.Eeg;
import com.choosemuse.libmuse.Muse;
import com.choosemuse.libmuse.MuseArtifactPacket;
import com.choosemuse.libmuse.MuseDataListener;
import com.choosemuse.libmuse.MuseDataPacket;
import com.choosemuse.libmuse.MuseDataPacketType;
import com.eeg_project.MainApplication;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MeditationModule extends ReactContextBaseJavaModule {

    // grab reference to global singletons
    MainApplication appState;
    private ReactContext mReactContext;
    private SVM_Helper sh;
    public MeditationDataListener dataListener;


    // ---------------------------------------------------------
    // Constructor

    public MeditationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
        sh = new SVM_Helper(this.mReactContext.getApplicationContext(), SVMConstants.SVM_MODEL_FN);
        dataListener = new MeditationDataListener();
    }

    // ---------------------------------------------------------
    // React Native Module methods
    // Required by ReactContextBaseJavaModule

    @Override
    public String getName() {
        return "Meditation";
    }

    @ReactMethod
    public void startMediationReading(){
        appState.connectedMuse.registerDataListener(dataListener, MuseDataPacketType.EEG);
        sh.handler.post(sh.processEEG);
    }

    @ReactMethod
    public void stopMeditationReading(){
        appState.connectedMuse.unregisterDataListener(dataListener, MuseDataPacketType.EEG);
        sh.handler.removeCallbacksAndMessages(null);
    }



    public class MeditationDataListener extends MuseDataListener{

        public final double[] rawEEG = new double[6];

        MeditationDataListener(){
        }

        @Override
        public void receiveMuseDataPacket(MuseDataPacket museDataPacket, Muse muse) {

            final long n = museDataPacket.valuesSize();
            if(museDataPacket.packetType() == MuseDataPacketType.EEG){
                getEegChannelValues(rawEEG, museDataPacket);
                sh.receiveEEGPacket(rawEEG);
            }
        }

        @Override
        public void receiveMuseArtifactPacket(MuseArtifactPacket museArtifactPacket, Muse muse) {

        }

        private void getEegChannelValues(double[] buffer, MuseDataPacket p) {
            buffer[0] = p.getEegChannelValue(Eeg.EEG1);
            buffer[1] = p.getEegChannelValue(Eeg.EEG2);
            buffer[2] = p.getEegChannelValue(Eeg.EEG3);
            buffer[3] = p.getEegChannelValue(Eeg.EEG4);
            buffer[4] = p.getEegChannelValue(Eeg.AUX_LEFT);
            buffer[5] = p.getEegChannelValue(Eeg.AUX_RIGHT);
        }


    }
}
