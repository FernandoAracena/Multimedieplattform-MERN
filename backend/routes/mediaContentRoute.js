import express from 'express';
import {MediaContent} from '../models/mediaContentModel.js';

const router =  express.Router();

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1||0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "views";
        let type = req.query.type || "All";

        const typeOptions = ["article", "video", "audio", "image"];

        type === "All"
            ? (type = [...typeOptions])
            : (type = req.query.type.split(","));
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if(sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const mediaContents = await MediaContent.find({title: {$regex: search, $options: "i"}})
            .where("type")
            .in([...type])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await MediaContent.countDocuments({
            type: {$in: [...type]},
            title: {$regex: search, $options: "i"},
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            types: typeOptions,
            mediaContents,
        };

        return res.status(200).json(response);
        // {
        //     count : mediaContents.length,
        //     data : mediaContents
        // }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: + err.message});
    }
});

router.get('/:_id', async (req, res) => {
    try {
        const {_id} = req.params;
        const mediaContent = await MediaContent.findById({_id});

        return res.status(200).json({mediaContent});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: + err.message});
    }
});

router.post('/', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.type ||
            !req.body.description ||
            !req.body.contentUrl ||
            !req.body.tags ||
            !req.body.publishDate ||
            !req.body.views ||
            !req.body.likes ||
            !req.body.comments 
        ) {
            return res.status(400).send({
                message: 'Send all the required fields: title, type, description, contentUrl, tags, publishDate, views, likes, comments',
            });
        }
        const newMediaContent = {
            title: req.body.title,
            type: req.body.type,
            description: req.body.description,
            contentUrl: req.body.contentUrl,
            tags: req.body.tags,
            publishDate: req.body.publishDate,
            views: req.body.views,
            likes: req.body.likes,
            comments: req.body.comments,
        };
        const mediaContent = await MediaContent.create(newMediaContent);

        return res.status(200).send(mediaContent);

    } catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.put('/:_id', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.type ||
            !req.body.description ||
            !req.body.contentUrl ||
            !req.body.tags ||
            !req.body.publishDate ||
            !req.body.views ||
            !req.body.likes ||
            !req.body.comments
        ) {
            return res.status(400).send({
                message: 'Send all the required fields: title, type, description, contentUrl, tags, publishDate, views, likes, comments',
            });
        }

        const {_id} = req.params;
        const mediaContent = await MediaContent.findByIdAndUpdate(_id, req.body);

        if(!mediaContent){
            return res.status(404).json({message: "MediaContent not found"});
        }
        
        return res.status(200).json({message: "MediaContent updated successfully"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: + err.message});
    }
});

router.delete('/:_id', async (req, res) => {
    try {
        const {_id} = req.params;
        const mediaContent = await MediaContent.findByIdAndDelete({_id});
        if(!mediaContent){
            return res.status(404).json({message: "MediaContent not found"});
        }

        return res.status(200).json({message: "MediaContent deleted successfully"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: + err.message});
    }
});

export default router;