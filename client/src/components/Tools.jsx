import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

const uploadImageByUrl = (e) => {
    let link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        }
        catch (err) {
            reject(err)
        }
    })

    return link.then(url => {
        return {
            success: 1,
            file: { url }
        }
    })
}

const uploadImageByFile = (e) => {
    return new Promise((resolve, reject) => {
        // Just a dummy local blob URL for now until AWS is configured
        let url = URL.createObjectURL(e)
        resolve({
            success: 1,
            file: { url }
        })
    })
}

export const tools = {
    header: {
        class: Header,
        config: {
            placeholder: "Type Heading....",
            levels: [2, 3, 4],
            defaultLevel: 2
        }
    },
    list: {
        class: List,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: 'http://localhost:5000/api/upload', // example
                byUrl: 'http://localhost:5000/api/uploadByUrl', // example
            },
            uploader: {
                uploadByUrl: uploadImageByUrl,
                uploadByFile: uploadImageByFile
            }
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    marker: Marker,
    inlineCode: InlineCode
}
