package com.eeg_project.components.meditation_focus_classifier;

import java.util.Arrays;

import static com.eeg_project.components.meditation_focus_classifier.SVMConstants.defaultPredictValue;
import static com.eeg_project.components.meditation_focus_classifier.SVMConstants.smoothPredict;

public class SmoothEEGResults {

    double[] predict;
    int pointer;

    public SmoothEEGResults() {
        pointer = 0;
        predict = new double[smoothPredict];
        Arrays.fill(predict, defaultPredictValue);
    }

    public void add(double prob) {
        predict[pointer] = prob;
        pointer = (pointer + 1) % smoothPredict;
    }

    public double getResult() {
        double sum = 0;
        for (double prob : predict) {
            sum += (prob / (double) smoothPredict);
        }
        return sum;
    }

}
