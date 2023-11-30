<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

    {{-- <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"> --}}
    <link rel="stylesheet" href="{{ asset('/assets/css/style.css') }}">

    <title>Tabel Lokasi</title>
</head>
<body>
    {{-- <header class="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <nav class="main-nav">
                <a href="/lokasi" class="logo">
                  <img src="{{ asset('../assets/images/GiziGrowth spg.png') }}" alt="Chain App Dev" style="width: 200px;">
                </a>
                <ul class="nav">
                  <li class="scroll-to-section"><a href="/lokasi" class="active">Beranda</a></li>
                  <li class="scroll-to-section"><a href="#services">Layanan</a></li>
                  <li class="scroll-to-section"><a href="#about">Pemetaan</a></li>
                  <li class="scroll-to-section"><a href="#pricing">Tentang</a></li>
                  <li class="scroll-to-section"><a href="#newsletter">Hubungi Kami</a></li>
                  <li>
                    <div class="gradient-button">
                        <a id="modal_trigger" href="#modal">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"/></svg>
                            Sign In Now
                        </a>
                    </div>
                    </li> 
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header> --}}
    
      @yield('content')
</body>
</html>