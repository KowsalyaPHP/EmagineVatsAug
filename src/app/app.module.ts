import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from "@angular/http";
import { FormsModule, NgModel, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { ReqDashboardComponent } from './req-dashboard/req-dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { RequisitionaddComponent } from './requisitionadd/requisitionadd.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AddskillComponent } from './addskill/addskill.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddcompetencyComponent } from './addcompetency/addcompetency.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AddeducationComponent } from './addeducation/addeducation.component';
import { FormDirective } from './requisitionadd/form.directive';
import { FilterPipe } from './requisitionadd/filter.pipe';
import { LogoutComponent } from './logout/logout.component';
import { CloneComponent } from './clone/clone.component';
import { PublishComponent } from './publish/publish.component';
import { UnpublishComponent } from './unpublish/unpublish.component';
import { CvuploadComponent } from './cvupload/cvupload.component';
import { ToastrModule } from 'ngx-toastr';
import { ManageapplicationComponent } from './manageapplication/manageapplication.component';
import { ScreeningComponent } from './screening/screening.component';
import { OfferComponent } from './offer/offer.component';
import { NothiredComponent } from './nothired/nothired.component';
import { DatePipe } from '@angular/common';
import { SubstageComponent } from './substage/substage.component';
import { ApplicationinfoComponent } from './applicationinfo/applicationinfo.component';
import { PositionsComponent } from './positions/positions.component'
import { FlexLayoutModule } from "@angular/flex-layout";
import {StyleUtils,StylesheetMap,MediaMarshaller,ɵMatchMedia,BreakPointRegistry,PrintHook,LayoutStyleBuilder,FlexStyleBuilder,ShowHideStyleBuilder,FlexOrderStyleBuilder,LayoutAlignStyleBuilder,LayoutGapStyleBuilder} from "@angular/flex-layout";
import { DocviewComponent } from './docview/docview.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { ReqcvlogsComponent } from './reqcvlogs/reqcvlogs.component';
import { ClientregComponent } from './clientreg/clientreg.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DocviewjdComponent } from './docviewjd/docviewjd.component';
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
import { RoleaddComponent } from './roleadd/roleadd.component';
import { RuleComponent } from './rule/rule.component';
import { RuleaddComponent } from './ruleadd/ruleadd.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { AddskillcompetencyComponent } from './addskillcompetency/addskillcompetency.component';
import { AboutreleaseComponent } from './aboutrelease/aboutrelease.component';
import { AddcityComponent } from './addcity/addcity.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { CvuploadvatsComponent } from './cvuploadvats/cvuploadvats.component';
import { JobdescriptionComponent } from './jobdescription/jobdescription.component';
import { CvtransferComponent } from './cvtransfer/cvtransfer.component';
import { FilterclientPipe } from './clientreg/filterclient.pipe';
import { FiltervendorPipe } from './vendorreg/filtervendor.pipe';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { FilterchildPipe } from './clientchild/filterchild.pipe';
import { FiltersubchildPipe } from './clientchild/filtersubchild.pipe';
import { PublishresourceComponent } from './publishresource/publishresource.component';
import { SearchComponent } from './search/search.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FilterpublishPipe } from './publish/filterpublish.pipe';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReqDashboardComponent,
    RequisitionaddComponent,
    AddskillComponent,
    AddcompetencyComponent,
    LoginComponent,
    AddeducationComponent,
    FormDirective,
    FilterPipe,
    LogoutComponent,
    CloneComponent,
    PublishComponent,
    UnpublishComponent,
    CvuploadComponent,
    ManageapplicationComponent,
    ScreeningComponent,
    OfferComponent,
    NothiredComponent,
    SubstageComponent,
    ApplicationinfoComponent,
    PositionsComponent,
    DocviewComponent,
    ReqcvlogsComponent,
    ClientregComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    DocviewjdComponent,
    ViewrequisitionComponent,
    PrescreeningquestionComponent,
    VendorregComponent,
    AdminComponent,
    UserregComponent,
    UserdashboardComponent,
    ClientchildComponent,
    TemplateComponent,
    DownloadComponent,
    RoleComponent,
    RoleaddComponent,
    RuleComponent,
    RuleaddComponent,
    PasswordchangeComponent,
    AddskillcompetencyComponent,
    AboutreleaseComponent,
    AddcityComponent,
    ResetpasswordComponent,
    CvuploadvatsComponent,
    JobdescriptionComponent,
    CvtransferComponent,
    FilterclientPipe,
    FiltervendorPipe,
    LandingpageComponent,
    FilterchildPipe,
    FiltersubchildPipe,
    PublishresourceComponent,
    SearchComponent,
    FilterpublishPipe,
    ReportComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    RichTextEditorAllModule,
    NgxMatSelectSearchModule,
    HttpModule, 
    Ng2SearchPipeModule,  
    ToastrModule.forRoot(),
    FlexLayoutModule,
    NgxDocViewerModule,
    TooltipModule, 
    ClipboardModule,
    ReportViewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [LoginService,DatePipe,StyleUtils,StylesheetMap,MediaMarshaller,ɵMatchMedia,BreakPointRegistry,PrintHook,LayoutStyleBuilder,FlexStyleBuilder,ShowHideStyleBuilder,FlexOrderStyleBuilder,LayoutAlignStyleBuilder,LayoutGapStyleBuilder],
  bootstrap: [AppComponent],
  entryComponents: [DocviewComponent,DocviewjdComponent,RoleaddComponent,RuleaddComponent,AddskillcompetencyComponent,AddcityComponent,AboutreleaseComponent,ResetpasswordComponent,CvtransferComponent,PublishresourceComponent,SearchComponent,PublishComponent]
})

export class AppModule { }
