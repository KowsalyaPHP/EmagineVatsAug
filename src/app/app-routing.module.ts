import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ReqDashboardComponent } from "./req-dashboard/req-dashboard.component";
import { RequisitionaddComponent } from './requisitionadd/requisitionadd.component';
import { AddskillComponent } from './addskill/addskill.component';
import { AddcompetencyComponent } from './addcompetency/addcompetency.component';
import { LoginComponent } from './login/login.component';
import { AddeducationComponent } from './addeducation/addeducation.component';
import { LogoutComponent } from './logout/logout.component';
import { CloneComponent } from './clone/clone.component';
import { PublishComponent } from './publish/publish.component';
import { UnpublishComponent } from './unpublish/unpublish.component';
import { CvuploadComponent } from './cvupload/cvupload.component';
import { ManageapplicationComponent } from './manageapplication/manageapplication.component';
import { ScreeningComponent } from './screening/screening.component';
import { OfferComponent } from './offer/offer.component';
import { NothiredComponent } from './nothired/nothired.component';
import { SubstageComponent } from './substage/substage.component';
import { ApplicationinfoComponent } from './applicationinfo/applicationinfo.component'
import { PositionsComponent } from './positions/positions.component'
import { ReqcvlogsComponent } from './reqcvlogs/reqcvlogs.component';
import { ClientregComponent } from './clientreg/clientreg.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ViewrequisitionComponent } from './viewrequisition/viewrequisition.component';
import { PrescreeningquestionComponent } from './prescreeningquestion/prescreeningquestion.component';
import { VendorregComponent } from './vendorreg/vendorreg.component';
import { AdminComponent } from './admin/admin.component';
import { UserregComponent } from './userreg/userreg.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ClientchildComponent } from './clientchild/clientchild.component';
import { TemplateComponent } from './template/template.component';
import { DownloadComponent } from './download/download.component';
import { RoleComponent } from './role/role.component';
import { RuleComponent } from './rule/rule.component';
import { CvuploadvatsComponent } from './cvuploadvats/cvuploadvats.component';
import { JobdescriptionComponent } from './jobdescription/jobdescription.component';

const routes: Routes = [
{
  path: "",
  component: LoginComponent
},
{
  path: "header",
  component: HeaderComponent
},
{
  path: "req-dashboard/:status",
  component: ReqDashboardComponent
},
{
  path: "requisitionadd/:id",
  component: RequisitionaddComponent
},
{
  path: "addskill",
  component: AddskillComponent
},
{
  path: "addcompetency",
  component: AddcompetencyComponent
},
{
  path: "addeducation",
  component: AddeducationComponent
},
{
  path: "logout",
  component: LogoutComponent
},
{
  path: "clone/:id",
  component: CloneComponent
},
{
  path: "publish/:id",
  component: PublishComponent
},
{
  path: "unpublish/:id",
  component: UnpublishComponent
},
{
  path: "cvupload/:id",
  component: CvuploadComponent
},
{
  path: "manage/:id/:stage",
  component: ManageapplicationComponent
},
{
  path: "screen/:id",
  component: ScreeningComponent
},
{
  path: "offer/:id",
  component: OfferComponent
},
{
  path: "nothired/:id",
  component: NothiredComponent
},
{
  path: "substage/:id",
  component: SubstageComponent
},
{
  path: "applicationinfo/:rid/:cid/:aid",
  component: ApplicationinfoComponent
},
{
  path: "position/:id",
  component: PositionsComponent
},
{
  path: "reqcvlog/:id",
  component: ReqcvlogsComponent
},
{
  path: "clientreg/:id",
  component: ClientregComponent
},
{
  path: "ForgotPassword/:username",
  component: ForgotpasswordComponent
},
{
  path: "changepassword",
  component: ChangepasswordComponent
},
{
  path: "viewrequisition/:id",
  component: ViewrequisitionComponent
},
{
  path: "prescreeningquestion/:id",
  component: PrescreeningquestionComponent
},
{
  path: "vendorreg/:id",
  component: VendorregComponent
},
{
  path: "admin",
  component: AdminComponent
},
{
  path: "userreg/:id",
  component: UserregComponent
},
{
  path: "user",
  component: UserdashboardComponent
},
{
  path: "child/:id/:cid",
  component: ClientchildComponent
},
{
  path: "template/:id",
  component: TemplateComponent
},
{
  path: "tracker/:id/:stage",
  component: DownloadComponent
},
{
  path: "role",
  component: RoleComponent
},
{
  path: "rule",
  component: RuleComponent
},
{
  path: "cvuploadvats/:id/:uid",
  component: CvuploadvatsComponent
},
{
  path:"jobdescription/:id/:uid",
  component: JobdescriptionComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
