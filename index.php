<?php include( 'header.php' ); ?>
<?php include( 'heading.php' ); ?>
<section id="main-content">
  <div class="container">
    <div class="row">
      <div class="col-12">
        
        <section id="sumary-dates" class="row sumary--dates py-4">
          
              <div class="col-12 col-lg-4 col-xl">
                <!-- solicitudes ingresadas  -->
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
              <div class="col-12 col-lg-4 col-xl">
                <!-- Hours -->
                <div class="card card-box bg-rechazada">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <!-- Icon -->
                      <span class="h2 icon-cross-box box-icon rechazada-icon"></span>                      
                      <div class="col text-right">
                        <!-- Title -->
                        <h2 class="title">Solicitudes</h2>
                        <h3 class="subtitle">Rechazadas</h3>
                        <!-- Heading -->
                        <span id="rechazadas" class="value">5</span>                   
                      </div>                  
                    </div> <!-- / .row -->
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-4 col-xl">
                <!-- Exit -->
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
          
        </section>


      </div> 
      <div class="col-12">
        <div class="row py-3 border-bottom">
          <div class="col-12 col-sm-7 col-md-7 col-lg-7">
            <div class="heading-section">
              <h3 class="title-heading">
              <span class="icon-carpet-box title-icon"></span>
              <span class="inner-title">Últimas Solicitudes</span>
              </h3>
            </div>
            
          </div>
          <div class="col-12 col-sm-5 col-md-5 col-lg-5">
            <div class="vertical-centering">
              <div class="btn-verticale btn-right">
                <a href="#" class="btn btn-full red"><span class="icon-add-circle"></span> Ingresar Solicitud</a>                
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div class="col-12">
        <?php include( 'datatable.php' ); ?>
      </div>
    </div>
  </div>
</section>
<?php include( 'footer.php' ); ?>