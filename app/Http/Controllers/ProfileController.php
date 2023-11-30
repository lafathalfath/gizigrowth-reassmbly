<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(){
        $user = Auth::user();
        // dd($user->id);
        return Inertia::render('Profile/Index', [
            // 'user' => $user,
        ]);
    }

    public function postProfileImage(Request $request){
        $user = Auth::user();
        // dd($user->id);
        if($request->has('file')){
            $photoProfile = $request->file('file')->hashName();
            // dd($photoProfile);
            $path = 'uploads/'.$user->id.'/photoProfile';
            // dd($path);
            if($user->profile_image != null){
                $localPath = public_path('uploads/'.$user->id.'/photoProfile');
                if(File::exists($localPath)){
                    $imageName = File::allFiles($path)[0]->getFilename();
                    File::delete($localPath.'/'.$imageName);
                }
                DB::table('users')->where('id', $user->id)->update(['profile_image' => null]);
            }
            $request->file('file')->move($path, $photoProfile);
            DB::table('users')->where('id', $user->id)->update(['profile_image' => $path.'/'.$photoProfile]);
        }
        else{
            return 'file tidak ditemukan';
        }
    }

    public function destroyProfileImage(){
        $user = Auth::user();
        $path = public_path('uploads/'.$user->id.'/photoProfile');
        if($user->profile_image){
            if(File::exists($path)){
                $images = File::allFiles($path)[0]->getFilename();
                File::delete($path.'/'.$images);
            }
            DB::table('users')->where('id', $user->id)->update(['profile_image' => null]);
        }
    }
    
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    
    public function destroyStorage(){
        $user = Auth::user();
        $path = public_path('uploads/'.$user->id);
        if(File::exists($path)){
            File::deleteDirectory($path);
        }else{
            return 'Aksi digagalkan';
        }
    }
}
