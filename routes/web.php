<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\DaerahController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataPanganController;
use App\Http\Controllers\DatasetController;
use App\Http\Controllers\DataStuntingController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\GbotController;
use App\Http\Controllers\GibotController;
use App\Http\Controllers\GpointController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LokasiController;
use App\Http\Controllers\PetaController;
use App\Models\Activity;
use App\Models\DownloadHistory;
use App\Models\Feedback;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use function App\Http\Middleware\isAdmin;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//inertia react

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

// dataset
Route::get('/dataset', [DatasetController::class, 'index'])->name('dataset');
Route::get('/dataset/stunting/{tahun}', [DatasetController::class, 'tahun']);
// Route::get('/dataset/stunting/{nama_daerah}', [DatasetController::class, 'daerah']);
Route::get('/stunting/download', [DownloadController::class, 'stunting']);
//end dataset

//gpoint
Route::get('/gpoint', [GpointController::class, 'index'])->name('gpoint');
//end gpoint

// gibot
Route::get('/gibot', [GibotController::class, 'index'])->name('gibot');
Route::get('/gibot/chat', [GibotController::class, 'chat']);
Route::post('/api/search', [GibotController::class, 'search']);
//gibot

// About 
Route::get('/about', function (){
    return Inertia::render('About/Index');
})->name('about');
// end About

// Contact
Route::get('/contact', function (){
    return Inertia::render('Contact/Index');
})->name('contact');
Route::post('/contact/feedback', function (Request $request){
    Feedback::create([
        'nama_depan' => $request->namaDepan,
        'nama_belakang' => $request->namaBelakang,
        'email' => $request->email,
        'no_telp' => $request->noTelp,
        'pesan' => $request->pesan
    ]);
});
// end Contact

// Route::get('/dashboard', [DashboardController::class, 'member'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboard', function(){
    $user = Auth::user();
    $history = DownloadHistory::where('id_user', $user->id)->get();
    // dd($history);
    if(isAdmin()){
        return redirect('/admin/dashboard');
    }else{
        return Inertia::render('Dashboard', [
            'user' => $user,
            'download_history' => $history
        ]);
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/admin/dashboard', function(){
    if(isAdmin()){
        $user = Auth::user();
        $activity = new Activity();
        $activity = $activity->where('id_user', $user->id)->get();
        return Inertia::render('AdminDashboard', [
            'user' => $user,
            'activity' => $activity,
        ]);
    }else{
        return redirect('dashboard');
    }
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/admin/dashboard', [DashboardController::class, 'admin'])->middleware(['auth', 'admin'])->name('admin.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy'); 
    Route::post('/profile/photo', [ProfileController::class, 'postProfileImage'])->name('postPhotoProfile');
    Route::delete('/profile/photo', [ProfileController::class, 'destroyProfileImage'])->name('deletePhotoProfile');
    Route::delete('/profile/storage', [ProfileController::class, 'destroyStorage'])->name('deleteStorage');
});

//end inertia react

Route::middleware(['auth', 'admin'])->group(function (){
    //Lokasi
    Route::get('/lokasi', [LokasiController::class, 'index'])->middleware(['auth', 'admin'])->name('lokasi');
    Route::post('/lokasi/store', [LokasiController::class, 'store'])->name('storeLokasi');
    Route::post('/lokasi/file/store', [LokasiController::class, 'importFile']);
    Route::put('/lokasi/{id}', [LokasiController::class, 'update']);
    Route::delete('/lokasi/{id}', [LokasiController::class, 'destroy']);
    Route::delete('/lokasi', [LokasiController::class, 'destroyAll']);
    //end Lokasi

    //daerah
    Route::get('/daerah', [DaerahController::class, 'index'])->middleware(['auth', 'admin'])->name('daerah');
    Route::post('/daerah/store', [DaerahController::class, 'store'])->name('storeDaerah');
    Route::post('/daerah/file/store', [DaerahController::class, 'importFile']);
    Route::put('/daerah/{id}', [DaerahController::class, 'update']);
    Route::delete('/daerah/{id}', [DaerahController::class, 'destroy']);
    Route::delete('/daerah', [DaerahController::class, 'destroyAll']);

    // Route::post('/daerah/load-activity', [DaerahController::class, 'loadActivity'])->name('daerahActivity');
    // end daerah

    //stunting
    Route::get('/kasus_stunting', [DataStuntingController::class, 'index']);
    Route::post('/kasus_stunting/store', [DataStuntingController::class, 'store']);
    Route::post('/kasus_stunting/file/store', [DataStuntingController::class, 'storeFile']);
    Route::put('/kasus_stunting/{id}/update', [DataStuntingController::class, 'update']);
    Route::delete('/kasus_stunting/{id}', [DataStuntingController::class, 'destroy']);
    Route::delete('/kasus_stunting', [DataStuntingController::class, 'destroyAll']);
    //end stunting

    //pangan
    Route::get('/ketahanan_pangan', [DataPanganController::class, 'index']);
    //end pangan

    //activity
    Route::get('/activity', [ActivityController::class, 'index']);
    //end activity
    Route::get('/download-history', function(){
        $user = Auth::user();
        $table = new DownloadHistory();
        $table = $table->where('id_user', $user->id)->get();
        // dd($table);
        return Inertia::render('DownloadHistory', [
            'user' => $user,
            'download_history' => $table,
        ]);
    });
});


require __DIR__.'/auth.php';//breeze
