<?php

namespace App\Http\Controllers;
use App\Models\Photo;
use Illuminate\Support\Facades\Redirect;

use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function destroy($id)
    {
        $photo = Photo::findOrFail($id);
        $photo->delete();

        return Redirect::back();
    }
}
