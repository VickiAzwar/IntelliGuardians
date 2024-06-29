import * as tf from "@tensorflow/tfjs";

let model = null;

export const setModel = (loadedModel) => {
    model = loadedModel;
};

export const getModel = () => {
    return model;
};

export const loadModel = async (modelName, setLoading) => {
    if (!model) {
        const tfReady = tf.ready();
        const yolov8 = await tfReady.then(async () => {
            const loadedModel = await tf.loadGraphModel(
                `${window.location.origin}/${modelName}_web_model/model.json`,
                {
                    onProgress: (fractions) => {
                        if (setLoading) {
                            setLoading((prev) => ({ ...prev, progress: fractions }));
                        }
                    }
                }
            );

            const dummyInput = tf.ones([1, loadedModel.inputs[0].shape[1], loadedModel.inputs[0].shape[2], loadedModel.inputs[0].shape[3]]);
            loadedModel.execute(dummyInput);
            tf.dispose(dummyInput);

            setModel(loadedModel); // Store the model globally
            return loadedModel;
        });
        return yolov8;
    } else {
        return model;
    }
};
