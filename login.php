<?php include( 'header.php'); ?>
<main id="wrapp-form-login" class="text-center">



<form class="form-signin">
    <div class="card inner-form">
        <div class="card-header">
            
            <img class="brand-login" src="images/mitta-black.png" alt="" width="" height="">
            <h3 class="title-header">Bienvenido</h3>
        </div>        
        <div class="card-body">
                <div class="form-group input-group">           
                    <input type="text" class="form-control input-control" id="exampleInputEmail1" placeholder="Usuario" required autofocus>
                </div>
                <div class="form-group input-group">
                    <input type="password" id="inputPassword" class="form-control input-control" placeholder="Password" required>
                </div>
                <div class="form-group form-link">
                    <a href="#" class="olvidar-pass">Olvidé mi contraseña?</a>
                </div>
        </div>        
        <div class="card-footer">
            <div class="wrapper-btn">
                <button class="btn btn-full black w-70" type="submit">Ingresar</button>
            </div>
            <p class="copyright-login">© 2020 - Mitta</p>
        </div>
    </div>
</form>
</main>
<?php include( 'footer.php'); ?>