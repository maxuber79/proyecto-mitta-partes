<?php include( 'header.php'); ?>
<?php include( 'heading.php'); ?>
<section id="main-content">

    <article id="heading">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-8 col-md-8 col-lg-8">
                    <div class="header-page vertical-centering">
                        <div class="vertical-object">
                            <h1 class="title-page"><span class="icon-arrow-box title-icon"></span> <span class="text-title">Ingreso de Solicitud</span></h1>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div class="card card-box bg-ingresada">
                        <div class="card-body">
                            <span class=""></span>
                            <div class="row align-items-center">                    
                            <!-- Icon -->
                            <span class="h2 icon-check-box box-icon ingresada-icon"></span>                      
                            <div class="col text-right">
                                <!-- Title -->
                                <h2 class="title">Solicitudes</h2>
                                <h3 class="subtitle">Ingresadas</h3>
                                <!-- Heading -->
                                <span id="ingresadas" class="value">120</span>                   
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
                                <label class="label-custom" for="file-input"><i class="fa fa-upload" aria-hidden="true"></i> Subir Archivo</label>
                                    <input type="file" class="file-input" id="file-input">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="wrapper-btn btn-right">
                                    <a href="#" class="btn btn-full red"><span class="icon-save"></span> Ingresar Solicitud</a>                
                                </div>
                            </div>
                            <div class="col-12 mt-3">
                                <div class="alert alert-success my-2 text-center" role="alert">
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <span class="icon-check-box"></span> El ingreso de la solicitud fue exitosa!, tu solicitud <strong>N° 001072</strong>, con fecha <strong>04/04/2020</strong>.
                                </div>
                                <div class="alert alert-warning my-2 text-center" role="alert">
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <span class="icon-cross-box"></span> <strong>Error en el ingreso</strong>, tu solicitud no pudo ser ingresada.
                                </div>
                            </div>
                        </form>
                    </div>


                   
                </div><!--./col-12-->
            </div> <!--./row-->
        </div><!--./container-->
    </article><!--#/wrapp-content-->
    
</section>
 

<?php include( 'footer.php'); ?>