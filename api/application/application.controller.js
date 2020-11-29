const {
        getApplicationStatus,
        getApplicationsForFofficer
      } = require("./application.service");      
const { checkPermision } = require("../../auth/roleauth");

module.exports = {
  getApplicationStatus: (req, res) => {
    const elder_id = req.auth.result.user_id;
  getApplicationStatus(elder_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }

      if (results.validity_by_gramaniladari == 0) {
        return res.json({
          success: 1,
          presentage:0,
          correction:results.correction,
          title:"elder.gramaniladari"
        });
      }
      if (results.validity_by_divisional_officer == 0) {
        return res.json({
          success: 1,
          presentage:20,
          correction:results.correction,
          title:"elder.divisional_officer"
        });
      }
      if (results.validity_by_divisional_head == 0) {
        return res.json({
          success: 1,
          presentage:70,
          correction:results.correction,
          title:"elder.divisional_head"
        });
      }


      if (results.validity_by_divisional_head == 1) {
        return res.json({
          success: 1,
          presentage:100,
          title:"elder.divisional_head"
        });
      }
      if (results.validity_by_divisional_officer == 1) {
        return res.json({
          success: 1,
          presentage:70,
          title:"elder.divisional_officer"
        });
      }
      if (results.validity_by_gramaniladari == 1) {
        return res.json({
          success: 1,
          presentage:20,
          title:"elder.gramaniladari"
        });
      }




     
      return res.json({
        success: 1,
        presentage:0
      });
    });
  },
  getAppliationDofficer: (req, res) => {
    const page = req.query.page
    const per_page =req.query.per_page
    const limitf=((page-1)*per_page)+1
    const limitl=page*per_page
    checkPermision( {role_id: req.auth.result.role_id,cap_id: 21,}, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          error: "Unauthorized access",
        });
      }
    });
    let divitionalid = new Promise((resolove, reject) => {

      getApplicationsForFofficer(req.auth.result.id,limitf,limitl,req.query.grama_division, (err,results,count) =>{
        if (err){
          console.log(err);
          reject(err)
        }
        if(!results){
         reject("ERROR NO USER DATA")
        }
        //pagenation
        //console.log(results)
        let data={};
        let last_page=Math.floor(count/req.query.per_page)
        if(last_page === 0){
          last_page=1;
        }
        let prev_page_url = req.protocol + "://" + req.get('host') + req.originalUrl;
        let next_page_url=prev_page_url;
        if(req.query.page !=1){
          next_page_url=req.protocol + "://" + req.get('host') + req.baseUrl+req._parsedUrl.pathname +"?"+"page="+(parseInt(req.query.page)+1)+"&"+"per_page="+per_page ;
        }
        data.next_page_url=next_page_url
        data.prev_page_url=prev_page_url
        data.total=count;
        data.last_page=last_page
        data.from=limitf
        data.to=limitl
        data.results=results
        console.log(data)
        resolove(data);
      });
    });


  divitionalid.then((dat) =>{

      return res.json({
        status: true,
        next_page_url:dat.next_page_url,
        prev_page_url:dat.prev_page_url,
        total:dat.total,
        last_page:dat.last_page,
        from:dat.from,
        to:dat.to,
        data:dat.results
        
    });
  }).catch((error) =>{console.log(error)});


  

  },
  
};
