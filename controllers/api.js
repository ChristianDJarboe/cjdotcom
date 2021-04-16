const mysql = require('mysql')
const { param } = require('../routers/api')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')
var path = require('path');


const getPosts = (req,res)=>{
  let sql = "SELECT * FROM posts ORDER BY insert_date DESC";
  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"get query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"query successful",code:200,data:rows});
  })
}

const createPost = (req,res)=>{
  console.log("create post");
  const {title,text_content,project_ref_id,project_ref_name,media_ref} = req.body;
  let sql = "INSERT INTO posts (title, text_content, project_ref_id,project_ref_name, media_ref) VALUES (?,?,?,?,?)"
  sql = mysql.format(sql,[title,text_content,project_ref_id,project_ref_name,media_ref])

  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"insert query failed",code:400})
      return console.log(err)
    }

    console.log(rows);
    return res.send({msg:"post created",code:200});
  })
}
const deletePost = (req,res)=>{
  let id = req.headers.post_id;
  let sql = "DELETE FROM posts WHERE id = ?";
  sql = mysql.format(sql,[id]);
  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"delete query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"delete query successful",code:200});
  })

}
const updatePost = (req,res)=>{
  const {id,title,text_content} = req.body;


  let sql = "UPDATE posts SET title = ?, text_content = ? WHERE id = ?";
  sql = mysql.format(sql,[title,text_content,id]);
  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"update query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"update query successful",code:200});
  })
}

const updatePostMetrics = (req,res)=>{
  let id = req.headers.post_id;
  let sql = "UPDATE posts SET likes = ?, shares = ?, views = ? WHERE id = ?";
  sql = mysql.format(sql,[id]);
  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"UPDATE query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"UPDATE query successful",code:200});
  })
  return res.send("update post")
}



const getProjects = (req,res)=>{
  let sql = "SELECT * FROM projects ORDER BY insert_date DESC";
  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"get query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"query successful",code:200,data:rows});
  })
}

const createProject = (req,res)=>{
  const {project_name, discription, media_ref, git_repo,demo_link,contributors,technologies} = req.body;
  console.log(req.body);
  let sql = "INSERT INTO projects (project_name, discription, media_ref, git_repo,demo_link,contributors,technologies) VALUES (?,?,?,?,?,?,?)"
  sql = mysql.format(sql,[project_name, discription, media_ref, git_repo,demo_link,contributors,technologies])

  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"insert query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"project created",code:200});
  })
}

const deleteProject = (req,res)=>{
  let id = req.headers.project_id;
  console.log(id)
  let sql = "DELETE FROM projects WHERE id = ?";
  sql = mysql.format(sql,[id]);
  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"delete query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"delete query successful",code:200});
  })
}

const updateProject = (req,res)=>{
  const {id,project_name, discription, media_ref, git_repo,demo_link,contributors,technologies} = req.body;


  let sql = "UPDATE projects SET project_name = ?, discription = ?, media_ref = ?, git_repo = ?, demo_link = ?, contributors = ?, technologies = ? WHERE id = ?";
  sql = mysql.format(sql,[project_name, discription, media_ref, git_repo,demo_link,contributors,technologies,id]);
  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"update query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"update query successful",code:200});
  })
}


const getSingleProject = (req,res)=>{
  let sql = "SELECT * FROM projects WHERE id = "+req.headers.project_id;
  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"get query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"query successful",code:200,data:rows});
  })
}

const getRelatedPosts =(req,res)=>{
  console.log(req.headers.project_id)
  let sql = "SELECT * FROM posts WHERE project_ref_id = "+req.headers.project_id;
  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"get query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"query successful",code:200,data:rows});
  })
}

const getSinglePost =(req,res)=>{
  console.log(req.headers.post_id)
  let sql = "SELECT * FROM posts WHERE id = "+req.headers.post_id;
  pool.query(sql,(err,rows)=>{
    if(err){
      res.send({msg:"get query failed",code:400})
      return console.log(err)
    }
    console.log(rows);
    return res.send({msg:"query successful",code:200,data:rows});
  })
}












  module.exports = {
    getSinglePost,
   getPosts,
   createPost,
   deletePost,
   updatePost,
   getRelatedPosts,

  updatePostMetrics,

  getSingleProject,
   getProjects,
   createProject,
   deleteProject,
   updateProject
  }


