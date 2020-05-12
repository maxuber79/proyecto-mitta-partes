<?php include( 'header.php'); ?>
<?php include( 'heading.php'); ?>
<section id="main-content">

    <article id="heading">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-8 col-md-8 col-lg-8">
                    <div class="header-page vertical-centering">
                        <div class="vertical-object">
                            <h1 class="title-page"><span class=" icon-search-box title-icon"></span> <span class="text-title">Seguimiento de Solicitud</span></h1>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div class="card card-box bg-enviada">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <!-- Icon -->
                      <span class="h2 icon-envio box-icon enviada-icon"></span>                                        
                      <div class="col text-right">
                        <!-- Title -->
                        <h2 class="title">Solicitudes</h2>
                        <h3 class="subtitle">Enviadas</h3>
                        <!-- Heading -->
                        <span id="enviadass" class="value">5</span>                   
                      </div>
                      
                    </div> <!-- / .row -->
                  </div>
                </div>
                </div>
            </div>
        </div>
    </article>
    <article id="wrapp-content">
        <div class="container">
            <div class="row">
                <div class="col-12"> 
                    
                    <div class="wrapp-form" style="border-radius:1rem;padding: 1.8rem 1.6rem;margin: 2rem 0 1rem 0;border: 1px solid #cecece;background-color: #fbfbfb;">
                        <form class="row">
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                <div class="form-group wrapp-input">   
                                    <label class="label-custom" for="exampleInputEmail1">Rut Empresa <span class="obligatorio">*</span></label>        
                                    <input type="text" id="exampleInputEmail1" class="form-control expanded-input"  placeholder="12345678-9" required>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                <div class="form-group wrapp-input">
                                    <label class="label-custom" for="exampleInputEmail1">Nombre Empresa <span class="obligatorio">*</span></label>
                                    <input type="text" id="inputPassword" class="form-control expanded-input" placeholder="Mi Empresa" required>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                <div class="form-group wrapp-input">  
                                    <label class="label-custom" for="exampleInputEmail1">Nombre Contacto <span class="obligatorio">*</span> </label>         
                                    <input type="text" id="exampleInputEmail1" class="form-control expanded-input" placeholder="" required>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                <div class="form-group wrapp-input">
                                    <label class="label-custom" for="exampleInputEmail1">Email</label>
                                    <input type="email" id="inputPassword" class="form-control expanded-input" placeholder="miemail@midominio.cl" required>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                <div class="form-group wrapp-input">  
                                    <label class="label-custom" for="exampleInputEmail1">Teléfono</label>         
                                    <input type="text" class="form-control expanded-input" id="exampleInputEmail1" placeholder="+562212345678" required>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                               <div class="form-group wrapp-input">                                    
                                <label class="label-custom" for="file-input"><i class="icon-upload" aria-hidden="true"></i> Subir Archivo</label>
                                    <input type="file" class="file-input" id="file-input">
                                </div>
                            </div>
                            <div class="col-12 py-3">
                                <div class="wrapper-btn btn-right">
                                    <a href="#" class="btn btn-full red"><span class="icon-editar-user"></span> Editar Solicitud</a>
                                    <a href="#" class="btn btn-full red"><span class="icon-save"></span> Guardar Solicitud</a>                
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="heading-section">
                                    <h3 class="title-heading">
                                    <span class="icon-envio title-icon"></span>
                                    <span class="inner-title">Estado de Solicitud</span>
                                    </h3>
                                </div>
                            </div>
                            <div class="col-12 mt-3">
                              <?php include( 'traking.php' ); ?>
                            </div>
                        </form>
                    </div>


                   
                </div><!--./col-12-->
            </div> <!--./row-->
        </div><!--./container-->
    </article><!--#/wrapp-content-->
    
</section>
 

<?php include( 'footer.php'); ?>